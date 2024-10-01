import { describe, expect, it } from 'vitest'
import { InputDateKeyPressBehavior as KeyPressBehavior } from '../../keypress/keypress-behavior/input-date-keypress'
import { InputDateBehavior as BehaviorType } from '../../keypress/keypress-behavior/keypress-behavior-types'

describe('Input date keypress behavior', () => {
  it('should return an Focus next Element behavior when you enter a tab button', () => {
    const keyPressBehaviorWithNextElement = KeyPressBehavior({
      keyPress: 'Tab',
    })
    expect(keyPressBehaviorWithNextElement).toStrictEqual({
      type: BehaviorType.FocusNextElement,
    })
  })

  it('should return an Previous next Element behavior when you enter a tab button and the shiftKey is active', () => {
    const keyPressBehaviorWithNextElement = KeyPressBehavior({
      keyPress: 'Tab',
      shiftKey: true,
    })
    expect(keyPressBehaviorWithNextElement).toStrictEqual({
      type: BehaviorType.FocusPreviousElement,
    })
  })

  it('should return an Invalid Data behavior when the keypress is a letter', () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 's',
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.InvalidData,
    })
  })

  it('should return an Arrow right behavior when you enter a arrow right button', () => {
    const nextElement = document.createElement('div')
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 'ArrowRight',
      nextElement,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.FocusNextElement,
    })
  })

  it('It should return an Arrow left behavior when you enter a arrow left button', () => {
    const prevElement = document.createElement('div')
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 'ArrowLeft',
      prevElement,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.FocusPreviousElement,
    })
  })

  it('It should return an Open or Close Date Picker behavior when you enter an Enter button', () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 'Enter',
      isButtonFocus: true,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.OpenOrCloseDatePicker,
    })
  })

  it('It should return an Focus a Next Element behavior when you enter an Enter button', () => {
    const nextElement = document.createElement('div')
    nextElement.className = 'input-date'
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 'Enter',
      nextElement,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.FocusNextElement,
    })
  })

  it('It should return an Invalid data behavior when you enter an Enter button', () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 'Enter',
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.InvalidData,
    })
  })

  it('It should return an Increase Value behavior when there is data and you enter a arrow up button', () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 'ArrowUp',
      dataValue: 1,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.IncreaseValue,
    })
  })

  it('It should return a Decrease Value behavior when there is data and you enter a arrow down button', () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 'ArrowDown',
      dataValue: 1,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.DecreaseValue,
    })
  })

  it('It should return a Set Minimum value behavior when there is no data registered and you enter a arrow up button', () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 'ArrowUp',
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.SetMinimumValue,
    })
  })

  it('It should return a Set Maximum value when there is no data registered and you enter a arrow down button', () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: 'ArrowDown',
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.SetMaximumValue,
    })
  })

  it('It should return an Adding valid data behavior when there is already data registered and then focus the next element', () => {
    const nextElement = document.createElement('div')
    const keyPressBehaviorWithNextElement = KeyPressBehavior({
      keyPress: '3',
      dataValue: 199,
      nextElement,
      maxValue: 2000,
    })
    expect(keyPressBehaviorWithNextElement).toStrictEqual({
      type: BehaviorType.AddValidDataWhenDataThenFocusNextElement,
      value: 1993,
    })
  })

  it('It should return an Adding valid data behavior when there is already data registered and no next element', () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: '3',
      dataValue: 199,
      maxValue: 2000,
    })

    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.AddValidDataWhenData,
      value: 1993,
    })
  })

  it('It should return an Adding valid data behavior when there is already data registered even if there is a next element', () => {
    const nextElement = document.createElement('div')
    const keyPressBehavior = KeyPressBehavior({
      keyPress: '3',
      dataValue: 19,
      nextElement,
      maxValue: 2000,
    })

    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.AddValidDataWhenData,
      value: 193,
    })
  })

  it('It should return an Invalid Data behavior when there is already data registered and a maxValue and we are trying to add a 0', () => {
    const keyPressBehavior = KeyPressBehavior({
      keyPress: '0',
      dataValue: 1999,
      maxValue: 2000,
    })
    expect(keyPressBehavior).toStrictEqual({
      type: BehaviorType.InvalidData,
    })
  })

  it('It should return an Adding valid data behavior when there is no data registered and focus the next element', () => {
    const nextElement = document.createElement('div')
    const keyPressBehaviorWithNextElement = KeyPressBehavior({
      keyPress: '4',
      nextElement,
      maxValue: 31,
    })
    expect(keyPressBehaviorWithNextElement).toStrictEqual({
      type: BehaviorType.AddValidDataWhenNoDataThenFocusNextElement,
    })
  })

  it('It should return an Adding valid data behavior when there is no data registered', () => {
    const keyPressBehaviorWithNextElement = KeyPressBehavior({
      keyPress: '4',
      maxValue: 31,
    })
    expect(keyPressBehaviorWithNextElement).toStrictEqual({
      type: BehaviorType.AddValidDataWhenNoData,
    })
  })

  it('should return an Invalid data when there is a Backspace button and no data registered', () => {
    const keyPressBehaviorWithNextElement = KeyPressBehavior({
      keyPress: 'Backspace',
    })
    expect(keyPressBehaviorWithNextElement).toStrictEqual({
      type: BehaviorType.InvalidData,
    })
  })

  it('should return an Invalid data when there is a Backspace button and no data registered', () => {
    const keyPressBehaviorWithNextElement = KeyPressBehavior({
      keyPress: 'Backspace',
      dataValue: 3,
    })
    expect(keyPressBehaviorWithNextElement).toStrictEqual({
      type: BehaviorType.DeleteValue,
    })
  })
})
