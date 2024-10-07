import { afterAll, expect, test } from 'vitest'
import '../src/my-element'

const _delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const _removeWhitespace = (html: string) => html.replace(/\s/g, '')

const appendElement = async (): Promise<HTMLElement> => {
  const $el = document.createElement('my-element')
  document.body.appendChild($el)
  await _delay(0) // Esperar para asegurar que el DOM esté actualizado
  return $el
}

afterAll(() => {
  const $el = document.querySelector('my-element')
  
  if (!$el) {
    return
  }

  document.body.removeChild($el)
})

function getButton() {
  return document.querySelector('my-element')?.shadowRoot?.querySelector('.btn')
}

test('should render the element', async () => {
  await appendElement()

  const $el = document.querySelector('my-element')
  expect($el).not.toBeNull()
  expect($el).to.have.property('counter', 0)
  
  const $btn = getButton()
  expect($btn?.textContent).toBe('Counter is: 0')
})

test('should increment the counter', async () => {
  await appendElement()

  const $el = document.querySelector('my-element')
  const $btn = getButton()

  $btn?.dispatchEvent(new MouseEvent('click'))
  await _delay(0)

  expect($el).to.have.property('counter', 1)
  expect($btn?.textContent).toBe('Counter is: 1')

  $btn?.dispatchEvent(new MouseEvent('click'))
  await _delay(0)

  expect($el).to.have.property('counter', 2)
  expect($btn?.textContent).toBe('Counter is: 2')
})
