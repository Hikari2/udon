
const TOY = 'TOY'
const SMALL = 'SMALL'
const MEDIUM = 'MEDIUM'
const LARGE = 'LARGE'
const EXTRA_LARGE = 'EXTRA_LARGE'

export function getSize(weight) {
  switch(true) {
    case (weight <= 5.4):
      return TOY
      break
    case (weight <= 11.3):
      return SMALL
      break
    case (weight <= 22.6):
      return MEDIUM
      break
    case (weight <= 45.3):
      return LARGE
      break
    default:
      return EXTRA_LARGE
      break
  }
}
