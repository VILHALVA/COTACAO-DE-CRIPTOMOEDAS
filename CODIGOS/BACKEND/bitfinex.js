const WebSocket = require('ws')

const subscriptionMsg = {
  event: 'subscribe',
  channel: 'ticker',
  from: 'BTC',
  to: 'USD'
}

subscriptionMsg.symbol = 't' + subscriptionMsg.from + subscriptionMsg.to

const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2')

let channelId = 0

ws.onmessage = (msg) => {
  msg.data = JSON.parse(msg.data)

  if (msg.data['event'] === 'subscribed'){
    channelId = msg.data.chanId
    console.log('Registrada assinatura de cotação de ' + subscriptionMsg.from + ' para ' + subscriptionMsg.to)
  } 
  else if (msg.data[0] === channelId && msg.data[1][6] !== undefined){
    console.log(subscriptionMsg.from + ' = ' + subscriptionMsg.to + ' ' + msg.data[1][6])
  }
}

ws.onopen = () => ws.send(JSON.stringify(subscriptionMsg))
