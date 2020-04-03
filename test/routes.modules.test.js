const assert = require('assert')
const proxyquire = require('proxyquire')

const { modulesMock, ModulesServiceMock } = require('../utils/mocks/modules')
const testServer = require('../utils/testServer')

describe('route - modules', function() {

    const route = proxyquire('../routes/modules', {
        '../services/modules': ModulesServiceMock
    })

    const request = testServer(route)

    describe('GET /modules', function() {
        it('should respond with status 200', function(done) {
            request.get('/api/modules').expect(200, done)
        })

        it('Should respond with a list of modules', function (done) {
            request.get('/api/modules').end((err, res) => {
                assert.deepEqual(res.body, {
                    data: modulesMock,
                    message: 'modules listed'
                })

                done()
            })
        })
    })
})