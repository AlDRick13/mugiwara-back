module.exports = {
    secret: process.env.AUTH_SECRET || '6gsJq[b?%UD*S7qE',
    expires: process.env.AUTH_EXPIRES || '24h',
    rounds: process.env.AUTH_ROUNDS || 10
};