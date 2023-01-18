const VoteController = require('../controllers/vote.controllers')
const { getPagination, getPagingData } = require('../../utils/pagination')

const voteController = new VoteController()

const getVotes = async (request, response, next) => {
    try {
        let query = request.query
        let { page, size } = query

        const { limit, offset } = getPagination(page, size, '10')
        query.limit = limit
        query.offset = offset

        let votes = await voteController.findAndCount(query)
        const results = getPagingData(votes, page, limit)
        return response.json({ results: results })

    } catch (error) {
        next(error)
    }
}

const addVote = async (request, response, next) => {
    try {
        let { body } = request
        let vote = await voteController.createVote(body)
        return response.status(201).json({ results: vote })
    } catch (error) {
        next(error)
    }
}

const getVote = async (request, response, next) => {
    try {
        let { id } = request.params
        let votes = await voteController.getVoteOr404(id)
        return response.json({ results: votes })
    } catch (error) {
        next(error)
    }
}

const updateVote = async (request, response, next) => {
    try {
        let { id } = request.params
        let { body } = request
        let vote = await voteController.updateVote(id, body)
        return response.json({ results: vote })
    } catch (error) {
        next(error)
    }
}

const removeVote = async (request, response, next) => {
    try {
        let { id } = request.params
        let vote = await voteController.removeVote(id)
        return response.json({ results: vote, message: 'removed' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getVotes,
    addVote,
    getVote,
    updateVote,
    removeVote
}