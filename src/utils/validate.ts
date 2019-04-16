const checkMobile = (value: any) => {
  if (!value) {
    return false
  }
  if (!value.match(/^1\d{10}$/) || value.match(/^1[0-2]\d{9}$/)) {
    return false
  } else {
    return true
  }
}
export { checkMobile }
