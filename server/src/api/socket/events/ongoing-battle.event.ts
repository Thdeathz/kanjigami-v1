import { Socket } from 'socket.io'
import { EventStatus } from '@prisma/client'

import { IEventData } from '../@types/event'
import redisClient from '~/api/databases/init.redis'
import io from '~/servers/init.socket'
import userService from '~/api/services/user.service'
import { UserSelectAnswers } from '../@types/game'
import { MultipleChoiceContent } from '~/api/@types/game'
import multipleChoiceController from '../controllers/multiple-choice.controller'
import ongoingBattleController from '../controllers/ongoing-battle.controller'

const onGogingBattleEvent = (socket: Socket) => {
  socket.on(
    'event:join',
    async ({ eventId, userId = '' }: { eventId: string; userId?: string }) => {
      const event = await redisClient.get(`event:${eventId}`)

      if (!event) {
        return io.emit('event:not-found')
      }

      const parsedEvent = JSON.parse(event) as IEventData

      // get round top user
      const rounds = parsedEvent.data.rounds.map(round => {
        if (round.status === EventStatus.FINISHED) {
          return {
            ...round,
            topUser: ongoingBattleController.getRoundTopUser(round.order, parsedEvent.users),
            currentUserPoint:
              parsedEvent.users.find(user => user.id === userId)?.points[round.order] || undefined
          }
        }

        return round
      })

      const leaderboards = ongoingBattleController.getLeaderboard(parsedEvent)

      socket.emit('event:joined', {
        event: { ...parsedEvent.data, rounds },
        users: leaderboards
      })
    }
  )

  socket.on(
    'event:join-lobby',
    async ({ eventId, userId }: { eventId: string; userId: string }) => {
      const event = await redisClient.get(`event:${eventId}`)

      if (!event) {
        return socket.emit('event:not-found')
      }

      const parsedEvent = JSON.parse(event) as IEventData

      if (parsedEvent.users.length >= parsedEvent.data.maxPlayers) {
        return socket.emit('event:lobby-full')
      }

      if (parsedEvent.users.find(user => user.id === userId)) {
        return socket.emit('event:user-already-joined')
      }

      const userData = await userService.getUserById(userId)

      if (!userData) {
        return socket.emit('event:user-not-found')
      }

      socket.join(eventId)

      const updatedEventData = {
        data: parsedEvent.data,
        users: [
          ...parsedEvent.users,
          {
            id: userData.id,
            username: userData.username,
            avatarUrl: userData.avatarUrl,
            points: []
          }
        ]
      } as IEventData

      await redisClient.set(`event:${eventId}`, JSON.stringify(updatedEventData), 'KEEPTTL')

      const leaderboards = ongoingBattleController.getLeaderboard(updatedEventData)

      io.to(eventId).emit('event:leaderboards', {
        users: leaderboards
      })
    }
  )

  socket.on(
    'event:get-round-content',
    async ({ eventId, roundId, userId }: { eventId: string; roundId: string; userId: string }) => {
      const event = await redisClient.get(`event:${eventId}`)

      if (!event) {
        return socket.emit('event:not-found')
      }

      const parsedEvent = JSON.parse(event) as IEventData

      const requestedUser = parsedEvent.users.find(user => user.id === userId)

      if (!requestedUser) {
        return socket.emit('event:user-not-joined')
      }

      const round = parsedEvent.data.rounds.find(round => round.id === roundId)

      if (!round || round.status !== EventStatus.ONGOING || !round.gameContent) {
        return socket.emit('event:round-ended')
      }

      const isPlayed = requestedUser.points.length >= round.order + 1

      if (isPlayed) {
        return socket.emit('event:already-played')
      }

      let roundContent: any = round.gameContent
      if (round.game.name === 'Multiple Choice') {
        roundContent = round.gameContent.map(each => ({
          question: {
            ...each.question,
            id: 'question'
          },
          options: each.options.map(option => ({
            id: 'option',
            option: option.kunyomi
          }))
        }))
      }

      const leaderboards = ongoingBattleController.getLeaderboard(parsedEvent)

      socket.emit('event:round-content', {
        round: {
          ...round,
          gameContent: roundContent
        },
        users: leaderboards
      })
    }
  )

  socket.on(
    'event:multiple-choice-calculate-score',
    async ({
      eventId,
      roundId,
      userId,
      answers
    }: {
      eventId: string
      roundId: string
      userId: string
      answers: UserSelectAnswers[]
    }) => {
      const event = await redisClient.get(`event:${eventId}`)

      if (!event) {
        return socket.emit('event:not-found')
      }

      const parsedEvent = JSON.parse(event) as IEventData

      const round = parsedEvent.data.rounds.find(round => round.id === roundId)

      if (!round || round.status !== EventStatus.ONGOING || !round.gameContent) {
        return socket.emit('event:round-ended')
      }

      const submitUser = parsedEvent.users.find(user => user.id === userId)
      if (submitUser?.points.length || 0 > round.order + 1) return

      const roundContent = round.gameContent as MultipleChoiceContent[]

      // Calculate score
      const finalScore = multipleChoiceController.calculateScore(roundContent, answers, 0)

      // Save score to redis
      const updatedEventData = {
        data: parsedEvent.data,
        users: parsedEvent.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              points: [...user.points, finalScore]
            }
          }

          return user
        })
      } as IEventData

      await redisClient.set(`event:${eventId}`, JSON.stringify(updatedEventData), 'KEEPTTL')

      const leaderboards = ongoingBattleController.getLeaderboard(updatedEventData)

      io.to(eventId).emit('event:leaderboards', {
        users: leaderboards
      })
    }
  )

  socket.on(
    'event:flip-blind-card-calculate-score',
    async ({
      eventId,
      roundId,
      userId,
      score
    }: {
      eventId: string
      roundId: string
      userId: string
      score: number
    }) => {
      const event = await redisClient.get(`event:${eventId}`)

      if (!event) {
        return socket.emit('event:not-found')
      }

      const parsedEvent = JSON.parse(event) as IEventData

      const round = parsedEvent.data.rounds.find(round => round.id === roundId)

      if (!round || round.status !== EventStatus.ONGOING || !round.gameContent) {
        return socket.emit('event:round-ended')
      }

      console.log(score)

      const finalScore = score * 16

      // Save score to redis
      const updatedEventData = {
        data: parsedEvent.data,
        users: parsedEvent.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              points: [...user.points, finalScore]
            }
          }

          return user
        })
      } as IEventData

      await redisClient.set(`event:${eventId}`, JSON.stringify(updatedEventData), 'KEEPTTL')

      const leaderboards = ongoingBattleController.getLeaderboard(updatedEventData)

      io.to(eventId).emit('event:leaderboards', {
        users: leaderboards
      })
    }
  )

  socket.on(
    'event:kanji-shooter-calculate-score',
    async ({
      eventId,
      roundId,
      userId,
      score
    }: {
      eventId: string
      roundId: string
      userId: string
      score: number
    }) => {
      const event = await redisClient.get(`event:${eventId}`)

      if (!event) {
        return socket.emit('event:not-found')
      }

      const parsedEvent = JSON.parse(event) as IEventData

      const round = parsedEvent.data.rounds.find(round => round.id === roundId)

      if (!round || round.status !== EventStatus.ONGOING || !round.gameContent) {
        return socket.emit('event:round-ended')
      }

      // Save score to redis
      const updatedEventData = {
        data: parsedEvent.data,
        users: parsedEvent.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              points: [...user.points, score]
            }
          }

          return user
        })
      } as IEventData

      await redisClient.set(`event:${eventId}`, JSON.stringify(updatedEventData), 'KEEPTTL')

      const leaderboards = ongoingBattleController.getLeaderboard(updatedEventData)

      io.to(eventId).emit('event:leaderboards', {
        users: leaderboards
      })
    }
  )
}

export default onGogingBattleEvent
