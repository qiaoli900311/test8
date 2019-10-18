/**
 * 购物车相关计算方法
 */

/**
 * 获取所有策略排列组合情况数组(笛卡尔积算法)
 * @param arr 各商品策略组成的数组 => [[商品1策略组],[商品2策略组],[商品3策略组]]
 * @returns {Array}
 */
export function getExchange(arr) {
  let results = []
  let result = []
  function doExchange(arr, index) {
    for (let i = 0; i < arr[index].length; i++) {
      result[index] = arr[index][i]
      if (index !== arr.length - 1) {
        doExchange(arr, index + 1)
      } else {
        results.push(JSON.parse(JSON.stringify(result)))
      }
    }
  }
  doExchange(arr, 0)
  return results
}

// 满减叠加计算
export function fusion(obj) {
  const products = obj.products
  const fusion = obj.fusion
  let result = {totalPrice: 0, saveMoney: 0}
  // let totalCount = 0
  products.forEach(item => {
    // totalCount += item.productCount - 0
    result.totalPrice += item.price * item.productCount
  })
  let rule = null
  fusion.rules.forEach(item => {
    if (result.totalPrice >= item.limit) {
      rule = item
    }
  })
  if (rule) {
    obj.isSuccess = true
    obj.ruleTitle.push(rule.policyName)

    result.totalPrice -= rule.preferential - 0
    result.saveMoney = rule.preferential - 0
  }
  return result
}
// 买高送低类优惠计算
export function calculate1(obj) {
  obj.ruleTitle = []
  const quantity = obj.rules[0].quantity
  const products = obj.products
  let result = {totalPrice: 0, saveMoney: 0}
  let totalCount = 0
  products.forEach(item => {
    totalCount += item.productCount - 0
  })

  if (products.length >= quantity) {
    obj.isSuccess = true
    obj.ruleTitle.push(obj.title)

    let lower = null
    products.forEach(item => {
      if (lower && item.price < lower.price) {
        lower = item
      }
      if (!lower) lower = item
      result.totalPrice += item.price * item.productCount
      item.calculatePrice = item.price
    })
    result.totalPrice -= lower.price - 0
    result.saveMoney = lower.price - 0
  } else {
    obj.isSuccess = false
    products.forEach(item => {
      result.totalPrice += item.memPrice * item.productCount
      item.actualPrice = item.memPrice
      item.calculatePrice = item.memPrice
    })
  }
  let fusionResult = obj.fusion && obj.isSuccess ? fusion(obj) : null
  if (fusionResult) {
    result.totalPrice -= fusionResult.saveMoney - 0
    result.saveMoney += fusionResult.saveMoney - 0
  }
  if (result.saveMoney > 0) {
    let actualPrice = Number((result.totalPrice / totalCount).toFixed(2)) // 计算优惠后均价
    products.forEach(item => (item.actualPrice = actualPrice))
  }
  return result
}

// 满额减额类优惠计算
export function calculate2(obj) {
  obj.ruleTitle = []
  const products = obj.products
  let result = {totalPrice: 0, saveMoney: 0}
  let totalCount = 0
  products.forEach(item => {
    totalCount += item.productCount - 0
    result.totalPrice += item.price * item.productCount
  })
  let rule = null
  obj.rules.forEach(item => {
    if (result.totalPrice >= item.limit) {
      rule = item
    }
  })
  if (rule) {
    obj.isSuccess = true
    obj.ruleTitle.push(rule.policyName)
    let actualPrice = Number((rule.preferential / totalCount).toFixed(2))
    products.forEach(item => {
      item.actualPrice = item.price - actualPrice
      item.calculatePrice = item.price
    })

    result.totalPrice -= rule.preferential - 0
    result.saveMoney = rule.preferential - 0
  } else {
    obj.isSuccess = false
    products.forEach(item => {
      item.actualPrice = item.memPrice
      item.calculatePrice = item.memPrice
    })
  }
  return result
}

// 买件送件类优惠计算
export function calculate3(obj) {
  obj.ruleTitle = []
  obj.successPro = []
  obj.failePro = []
  const products = obj.products
  let result = {totalPrice: 0, saveMoney: 0, virtualPrice: 0}
  let rules = obj.rules
  let totalCount = 0
  products.forEach(item => {
    totalCount += item.productCount - 0
  })

  let giveNum = 0
  products.forEach(item => {
    let rule = getRule(item.productCount)
    let currCount = Number(item.productCount)
    if (rule) {
      obj.isSuccess = true
      obj.ruleTitle.indexOf(rule.policyName) < 0 &&
        obj.ruleTitle.push(rule.policyName)
      giveNum = Number(rule.preferential)
      item.giveNum = giveNum
      result.virtualPrice +=
        ((item.price * currCount) / (currCount + giveNum)) * giveNum
      result.saveMoney += item.price * giveNum
      result.totalPrice += item.price * currCount
      item.calculatePrice = item.price
      obj.successPro.push(item)
      // currCount -= giveNum
    } else {
      obj.failePro.push(item)
      obj.isSuccess = obj.isSuccess ? obj.isSuccess : false
      result.totalPrice += item.memPrice * currCount
      item.calculatePrice = item.memPrice
    }
  })

  let fusionResult = obj.fusion && obj.isSuccess ? fusion(obj) : null
  if (fusionResult) {
    result.totalPrice -= fusionResult.saveMoney - 0
    result.saveMoney += fusionResult.saveMoney - 0
  }

  let actualPrice = Number((result.totalPrice / totalCount).toFixed(2)) // 计算优惠后均价
  products.forEach(item => (item.actualPrice = actualPrice))

  function getRule(count) {
    let big = null
    rules.forEach(i => {
      if (count >= i.limit) {
        big = i
      }
    })
    return big
  }

  return result
}

// 满额打折类优惠计算
export function calculate4(obj) {
  const products = obj.products
  let result = {totalPrice: 0, saveMoney: 0}
  let totalCount = 0
  products.forEach(item => {
    const price = item.price * item.productCount
    result.totalPrice += price

    totalCount += item.productCount - 0
  })
  let rule = null
  obj.rules.forEach(item => {
    if (result.totalPrice >= item.limit) {
      rule = item
    }
  })
  if (rule) {
    obj.isSuccess = true
    obj.ruleTitle = [rule.policyName]
    const oldTotal = result.totalPrice
    result.totalPrice = (result.totalPrice * rule.discount * 0.1).toFixed(2)
    result.saveMoney = oldTotal - result.totalPrice

    products.forEach(item => {
      item.actualPrice = Number((item.price * rule.discount * 0.1).toFixed(2))
      item.calculatePrice = item.price
    })
  } else {
    obj.isSuccess = false
    products.forEach(item => {
      const price = item.memPrice * item.productCount
      result.totalPrice += price

      item.actualPrice = item.memPrice
      item.calculatePrice = item.memPrice
    })
  }
  let fusionResult = obj.fusion && obj.isSuccess ? fusion(obj) : null
  if (fusionResult) {
    result.totalPrice -= fusionResult.saveMoney - 0
    result.saveMoney += fusionResult.saveMoney - 0

    let actualPrice = Number((result.totalPrice / totalCount).toFixed(2)) // 计算优惠后均价
    products.forEach(item => (item.actualPrice = actualPrice))
  }

  return result
}

// 会员价优惠计算
export function calculate5(obj) {
  const products = obj.products
  let result = {totalPrice: 0, saveMoney: 0}
  products.forEach(item => {
    result.totalPrice += item.memPrice * item.productCount
    item.actualPrice = item.memPrice
  })
  obj.isSuccess = true
  obj.ruleTitle = ['会员优惠价']
  return result
}

// 单品打折优惠计算
export function calculate6(obj) {
  obj.ruleTitle = []
  const products = obj.products
  let result = {totalPrice: 0, saveMoney: 0}
  let totalCount = 0
  products.forEach(item => {
    const price = item.price * item.productCount
    result.totalPrice += price

    totalCount += item.productCount - 0
  })
  let rule = obj.rules[0] || null

  if (rule) {
    obj.isSuccess = true
    obj.ruleTitle.push(rule.policyName)
    const oldTotal = result.totalPrice
    result.totalPrice = (result.totalPrice * rule.discount * 0.1).toFixed(2)
    result.saveMoney = oldTotal - result.totalPrice

    products.forEach(item => {
      item.actualPrice = Number((item.price * rule.discount * 0.1).toFixed(2))
      item.calculatePrice = item.price
    })
  } else {
    obj.isSuccess = false
    products.forEach(item => {
      const price = item.memPrice * item.productCount
      result.totalPrice += price

      item.actualPrice = item.memPrice
      item.calculatePrice = item.memPrice
    })
  }
  let fusionResult = obj.fusion && obj.isSuccess ? fusion(obj) : null
  if (fusionResult) {
    result.totalPrice -= fusionResult.saveMoney - 0
    result.saveMoney += fusionResult.saveMoney - 0

    let actualPrice = Number((result.totalPrice / totalCount).toFixed(2)) // 计算优惠后均价
    products.forEach(item => (item.actualPrice = actualPrice))
  }
  return result
}
