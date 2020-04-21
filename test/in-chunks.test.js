'use strict'

describe('inChunks', () => {
  const { expect } = require('chai')
  const inChunks = require('../in-chunks')
  const List = require('../classes/list')

  context('chunk size < 1', () => {
    it('should throw an Error', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      const caller = () => inChunks(array, 0)

      expect(caller).to.throw(Error, 'n[0] < 1')
    })
  })

  context('array.length > chunk size', () => {
    it('should return 1 chunk with a similar array but not the same array', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      const result = inChunks(array, 20)
      const expected = [array]

      expect(result).to.deep.equal(expected)
      expect(result[0]).to.not.equal(array)
    })
  })

  context('array.length < chunk size', () => {
    it('should return the proper chunks', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      const result = inChunks(array, 2)
      const expected = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 0]]

      expect(result).to.deep.equal(expected)
      expect(result[0]).to.not.equal(array)
    })
  })

  context('array.length < chunk size', () => {
    it('should return the proper chunks', () => {
      const list = List.ify([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
      const result = list.inChunksOf(2)
      const expected = List.ify([[1, 2], [3, 4], [5, 6], [7, 8], [9, 0]])

      expect(result).to.be.instanceof(List)
      expect(result).to.deep.equal(expected)
      expect(result[0]).to.not.equal(list)
    })
  })
})
