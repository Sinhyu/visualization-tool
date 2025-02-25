
const fs = require('fs-extra')
const csv = require('csv-parser')

async function read (simulationId) {
  // const file = `/home/ubuntu/uniq-sim/output/${simulationId}/train/train_epoch_total_reward.txt`
  const file = `/home/ubuntu/uniq-sim/data/${simulationId}/output/train/train_epoch_total_reward.txt`

  await fs.access(file, fs.F_OK)

  const d = await csvToObj(file)
  console.log(d)
  return d
}

async function csvToObj (file) {
  const map = Object.create({})
  return new Promise((resolve, reject) => {
    try {
      fs.createReadStream(file)
        .pipe(csv())
        .on('data', (row) => {
          const target = map[row.tl_name] || []
          if (row.reward) {
            target.push({
              // phase: row.phase,
              reward: row.reward,
              rewardAvg: row['40ep_reward']
            })
            map[row.tl_name] = target
          }
        })
        .on('end', () => {
          resolve(map)
        })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = read
