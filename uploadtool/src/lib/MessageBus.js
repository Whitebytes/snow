import client from "./Subscriptions"
import gql from "graphql-tag";

const pubMessage =gql`mutation publish(
    $topic: String!,
    $payload: String
  ){publish(
    topic:$topic,
    payload:$payload
  ){userId, id}}`

var subscribers =[]

const publish = (payload) =>{
    var promise = new Promise(function (resolve, reject){
        client.mutate({
            mutation: pubMessage,
            variables:{...payload }
        })
        .then( ({data}) =>{
            console.log(`did publish ${payload.topic}`)
  
        }, (error) =>reject(error))
    }) 
    return promise;
}
const subscribe = (sender, topic, handler) =>{
    subscribers.push({
        sender, 
        topic, 
        handle: handler
    })
}
const dispatch = (message) =>{

    subscribers.filter(({sender, topic})=>{
        let match =  (!sender ||sender==message.sender) 
            && (!topic || topic==message.topic)
            return match;
    }).forEach(item=>{
        console.log(`handling ${message.topic}`)
        item.handle(message)
    })
}
export {dispatch, publish, subscribe}