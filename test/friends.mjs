import fs from 'fs'
import test from 'tape'
import testdouble from 'testdouble'
import Friends from '../lib/friends'

// Override 'Friends.databasePath'
const databasePath = 'data/test.json'
testdouble.replace(Friends, 'databasePath', databasePath)

// Override 'Friends.fetch'
const fakeFriends = {
  previous_cursor: 0,
  ids: [657693, 183709371, 7588892, 38895958, 22891211],
  previous_cursor_str: '0',
  next_cursor: 0,
  next_cursor_str: '0'
}
testdouble.replace(Friends, 'fetch', () => fakeFriends)

function beforeEach () {
  fs.unlink(databasePath)
  fs.writeFileSync(databasePath, '')
}

test('Friends.constructor', t => {
  t.plan(1)

  beforeEach()
  t.deepEqual(
    new Friends('smockled').valueOf(),
    fakeFriends,
    'verify save & retrieve'
  )
})