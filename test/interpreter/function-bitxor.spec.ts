import {HyperFormula} from '../../src'
import {CellValueType, ErrorType} from '../../src/Cell'
import {adr, detailedError} from '../testUtils'

describe('function BITXOR', () => {
  it('should not work for wrong number of arguments', () => {
    const engine = HyperFormula.buildFromArray([
      ['=BITXOR(101)'],
      ['=BITXOR(1, 2, 3)'],
    ])

    expect(engine.getCellValue(adr('A1'))).toEqual(detailedError(ErrorType.NA))
    expect(engine.getCellValue(adr('A2'))).toEqual(detailedError(ErrorType.NA))
  })

  it('should not work for arguemnts of wrong type', () => {
    const engine = HyperFormula.buildFromArray([
      ['=BITXOR(1, "foo")'],
      ['=BITXOR("bar", 4)'],
      ['=BITXOR("foo", "baz")'],
    ])

    expect(engine.getCellValue(adr('A1'))).toEqual(detailedError(ErrorType.VALUE))
    expect(engine.getCellValue(adr('A2'))).toEqual(detailedError(ErrorType.VALUE))
    expect(engine.getCellValue(adr('A3'))).toEqual(detailedError(ErrorType.VALUE))
  })

  it('should not work for negative numbers', () => {
    const engine = HyperFormula.buildFromArray([
      ['=BITXOR(1, -2)'],
      ['=BITXOR(-1, 2)'],
    ])

    expect(engine.getCellValue(adr('A1'))).toEqual(detailedError(ErrorType.NUM))
    expect(engine.getCellValue(adr('A2'))).toEqual(detailedError(ErrorType.NUM))
  })

  it('should not work for non-integers', () => {
    const engine = HyperFormula.buildFromArray([
      ['=BITXOR(1.2, 2)'],
      ['=BITXOR(3.14, 5)'],
    ])

    expect(engine.getCellValue(adr('A1'))).toEqual(detailedError(ErrorType.NUM))
    expect(engine.getCellValue(adr('A2'))).toEqual(detailedError(ErrorType.NUM))
  })

  it('should work', () => {
    const engine = HyperFormula.buildFromArray([
      ['=BITXOR(1, 5)'],
      ['=BITXOR(457, 111)'],
      ['=BITXOR(BIN2DEC(101), BIN2DEC(1))'],
      ['=BITXOR(256, 123)'],
      ['=BITXOR(0, 0)'],
    ])

    expect(engine.getCellValue(adr('A1'))).toEqual(4)
    expect(engine.getCellValue(adr('A2'))).toEqual(422)
    expect(engine.getCellValue(adr('A3'))).toEqual(4)
    expect(engine.getCellValue(adr('A4'))).toEqual(379)
    expect(engine.getCellValue(adr('A5'))).toEqual(0)
  })

  it('should return numeric type', () => {
    const engine = HyperFormula.buildFromArray([
      ['=BITXOR(1, 5)'],
    ])

    expect(engine.getCellValueType(adr('A1'))).toEqual(CellValueType.NUMBER)
  })
})
