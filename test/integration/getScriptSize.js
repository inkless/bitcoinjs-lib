// https://en.bitcoin.it/wiki/Protocol_documentation#Variable_length_integer
function varLengthFor(length) {
  if (length < 253) {
    return 1
  }

  // Rest have a prefix byte
  var numBytes
  if (length < 65535) {
    numBytes = 2
  } else if (length < 4294967295) {
    numBytes = 4
  } else if (length < 18446744073709551615) {
    numBytes = 8
  } else {
    throw new Error('Size of varint too large')
  }

  return 1 + numBytes
}

const sigSize = 72

exports.getScriptSize = function getScriptSize(m, redeemScriptLength) {
  return (
    1 +
    m * (1 + sigSize) +
    varLengthFor(redeemScriptLength) +
    redeemScriptLength
  )
}
