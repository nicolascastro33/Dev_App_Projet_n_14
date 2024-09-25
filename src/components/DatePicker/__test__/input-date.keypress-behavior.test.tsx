import { describe, test, expect } from 'vitest'
import { InputDateKeyPressBehavior as KeyPressBehavior } from '../keypress-behavior/input-date-keypress'
import { InputDateBehavior as BehaviorType } from '../keypress-behavior/keypress-behavior-types'
import { render, screen } from '@testing-library/react'

describe.skip('Input date keypress behavior', () => {
  test('It should return an Invalid Data behavior', () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 's',
      dataValue: undefined,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.InvalidData,
    })
  })

  test('It should return an Arrow right behavior', async () => {
    render(<p>Next Element</p>)
    const nextElement = (await screen.queryByText(
      'Next Element'
    )) as HTMLElement
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 'ArrowRight',
      dataValue: undefined,
      nextElement, 
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.FocusNextElement,
    })
  }) 

  test('It should return an Arrow left behavior', async () => {
    const prevElement = document.createElement('div')
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 'ArrowLeft',
      dataValue: undefined,
      prevElement,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.FocusPreviousElement,
    })
  })

  test('It should return an Enter behavior', async () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 'Enter',
      dataValue: undefined,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.Enter,
    })
  })

  test('It should return an Arrow up behavior when there is data', async () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 'ArrowUp',
      dataValue: 1,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.ArrowUp,
    })
  })

  test('It should return an Arrow down behavior when there is data', async () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 'ArrowDown',
      dataValue: 1,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.ArrowDown,
    })
  })

  test('It should return an Arrow up behavior when there is no data registered', async () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 'ArrowUp',
      dataValue: undefined,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.ArrowUpWhenNoData,
    })
  })

  test('It should return an Arrow down behavior when there is no data registered', async () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 'ArrowDown',
      dataValue: undefined,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.ArrowDownWhenNoData,
    })
  })

  test('It should return an Adding valid data behavior when there is already data registered without focusing on the next element', async () => {
    const keyPressBehaviorWithNextElement = KeyPressBehavior({
      keyPress: '3',
      dataValue: 10,
      nextElement: true,
      maxValue: 2000,
    })
    expect(keyPressBehaviorWithNextElement).toStrictEqual({
      type: BehaviorType.AddValidDataWhenData,
      value: 103,
    })

    const keyPressBehaviorWithoutNextElement = KeyPressBehavior({
      keyPress: '3',
      dataValue: 199,
      nextElement: false,
      maxValue: 2000,
    })

    expect(keyPressBehaviorWithoutNextElement).toStrictEqual({
      type: BehaviorType.AddValidDataWhenData,
      value: 1993,
    })
  })

  test('It should return an Adding valid data behavior when there is already data registered and focus on the next element', async () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: '4',
      dataValue: 199,
      nextElement: true,
      maxValue: 2000,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.AddValidDataWhenDataThenFocusNextElement,
      value: 1994,
    })
  })

  test('It should return an Invalid Data behavior when there is already data registered and a maxValue and we are trying to a 0', async () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: '0',
      dataValue: 1999,
      nextElement: true,
      maxValue: 2000,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.InvalidData,
    })
  })

  test('It should return an Adding valid data behavior when there is no data registered', async () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: '3',
      dataValue: undefined,
      nextElement: true,
      maxValue: 30,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.AddValidDataWhenNoData,
    })
  })

  test('It should return an Adding valid data behavior when there is no data registered and focus next element', async () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: '4',
      dataValue: undefined,
      nextElement: true,
      maxValue: 30,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.AddValidDataWhenNoDataThenFocusNextElement,
    })
  })
})
