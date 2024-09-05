import { describe, test, expect } from 'vitest'
import { BehaviorType, InputDateBehavior } from '../input-date-behavior'

describe('Input date keypress behavior', () => {
  test('It should return an Invalid Data behavior', () => {
    const inputDateBehavior = InputDateBehavior({
      keyPress: 's',
      dataValue: undefined,
    })
    expect(inputDateBehavior).toStrictEqual({ type: BehaviorType.InvalidData })
  })

  test('It should return an Arrow right behavior', async () => {
    const inputDateBehavior = InputDateBehavior({
      keyPress: 'ArrowRight',
      dataValue: undefined,
      nextElement: true,
    })
    expect(inputDateBehavior).toStrictEqual({ type: BehaviorType.ArrowRight })
  })

  test('It should return an Arrow left behavior', async () => {
    const inputDateBehavior = InputDateBehavior({
      keyPress: 'ArrowLeft',
      dataValue: undefined,
      prevElement: true,
    })
    expect(inputDateBehavior).toStrictEqual({ type: BehaviorType.ArrowLeft })
  })

  test('It should return an Enter behavior', async () => {
    const inputDateBehavior = InputDateBehavior({
      keyPress: 'Enter',
      dataValue: undefined,
    })
    expect(inputDateBehavior).toStrictEqual({ type: BehaviorType.Enter })
  })

  test('It should return an Arrow up behavior when there is data', async () => {
    const inputDateBehavior = InputDateBehavior({
      keyPress: 'ArrowUp',
      dataValue: 1,
    })
    expect(inputDateBehavior).toStrictEqual({ type: BehaviorType.ArrowUp })
  })

  test('It should return an Arrow down behavior when there is data', async () => {
    const inputDateBehavior = InputDateBehavior({
      keyPress: 'ArrowDown',
      dataValue: 1,
    })
    expect(inputDateBehavior).toStrictEqual({ type: BehaviorType.ArrowDown })
  })

  test('It should return an Arrow up behavior when there is no data registered', async () => {
    const inputDateBehavior = InputDateBehavior({
      keyPress: 'ArrowUp',
      dataValue: undefined,
    })
    expect(inputDateBehavior).toStrictEqual({
      type: BehaviorType.ArrowUpWhenNoData,
    })
  })

  test('It should return an Arrow down behavior when there is no data registered', async () => {
    const inputDateBehavior = InputDateBehavior({
      keyPress: 'ArrowDown',
      dataValue: undefined,
    })
    expect(inputDateBehavior).toStrictEqual({
      type: BehaviorType.ArrowDownWhenNoData,
    })
  })

  test('It should return an Adding valid data behavior when there is already data registered without focusing on the next element', async () => {
    const inputDateBehaviorWithNextElement = InputDateBehavior({
      keyPress: '3',
      dataValue: 10,
      nextElement: true,
      maxValue: 2000,
    })
    expect(inputDateBehaviorWithNextElement).toStrictEqual({
      type: BehaviorType.AddValidDataWhenData,
      value: 103,
    })

    const inputDateBehaviorWithoutNextElement = InputDateBehavior({
      keyPress: '3',
      dataValue: 199,
      nextElement: false,
      maxValue: 2000,
    })

    expect(inputDateBehaviorWithoutNextElement).toStrictEqual({
      type: BehaviorType.AddValidDataWhenData,
      value: 1993,
    })
  })

  test('It should return an Adding valid data behavior when there is already data registered and focus on the next element', async () => {
    const inputDateBehavior = InputDateBehavior({
      keyPress: '4',
      dataValue: 199,
      nextElement: true,
      maxValue: 2000,
    })
    expect(inputDateBehavior).toStrictEqual({
      type: BehaviorType.AddValidDataWhenDataThenFocusNextElement,
      value: 1994,
    })
  })

  test('It should return an Invalid Data behavior when there is already data registered and a maxValue and we are trying to a 0', async () => {
    const inputDateBehavior = InputDateBehavior({
      keyPress: '0',
      dataValue: 1999,
      nextElement: true,
      maxValue: 2000,
    })
    expect(inputDateBehavior).toStrictEqual({
      type: BehaviorType.InvalidData,
    })
  })

  test('It should return an Adding valid data behavior when there is no data registered', async () => {
    const inputDateBehavior = InputDateBehavior({
      keyPress: '3',
      dataValue: undefined,
      nextElement: true,
      maxValue: 30,
    })
    expect(inputDateBehavior).toStrictEqual({
      type: BehaviorType.AddValidDataWhenNoData,
    })
  })

  test('It should return an Adding valid data behavior when there is no data registered and focus next element', async () => {
    const inputDateBehavior = InputDateBehavior({
      keyPress: '4',
      dataValue: undefined,
      nextElement: true,
      maxValue: 30,
    })
    expect(inputDateBehavior).toStrictEqual({
      type: BehaviorType.AddValidDataWhenNoDataThenFocusNextElement,
    })
  })
})
