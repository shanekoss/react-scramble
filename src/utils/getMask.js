import R from 'ramda'

export const getRandomMask = R.pipe(
  R.range(0),
  R.map(
    R.pipe(
      Math.random,
      Math.round
    )
  )
)

export const getFullMask = R.pipe(
  R.range(0),
  R.map(R.always(1))
)

export const getForwardMask = (length, roll = length, count = roll) => {
  if (count <= 1) {
    return R.repeat(1, length)
  }

  const base = R.pipe(
    R.divide,
    Math.floor,
    R.repeat(R.__, length)
  )(roll, length)

  for (let i = 0; i < roll % length; i++) {
    base[i]++
  }

  return R.pipe(
    R.scan(R.add, 0),
    R.findIndex(R.lt(roll - count)),
    R.juxt([
      R.repeat(1),
      R.pipe(
        R.subtract(length),
        R.repeat(0)
      ),
    ]),
    R.flatten
  )(base)
}
