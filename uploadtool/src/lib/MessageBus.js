import apiClient from "./ApiClient"
import gql from "graphql-tag";
import settings  from './Settings';
import {uploadFiles} from './FileUploader'

const pubMessage =gql`mutation publish(
    $receiver: String,
    $type: String!,
    $payload: String,
    $origin: Int
  ){publish(
    receiver:$receiver,
    type:$type,
    payload:$payload,
    origin: $origin
  ){userId, id}}`

let waitingList={}
var subscribers =[]

const publish = (payload, timeout=5000) =>{
    var promise = new Promise(function (resolve, reject){
        apiClient.mutate({
            mutation: pubMessage,
            variables:{...payload }
        })
        .then( ({data}) =>{
            console.log(`did publish ${payload.type}`)
            var id = data.publish.id;
            waitingList[id]={
                success: (result)=> {
                    delete waitingList[id]
                    resolve(result)
                }
                
            }
        }, (error) =>reject(error))
        //todo: add timeout
    }) 
    return promise;
}
const subscribe = (sender, type, handler) =>{
    subscribers.push({
        sender, 
        type, 
        handle: handler
    })
}
const dispatch = (message) =>{
    
    if (message.origin){
        var orgRequest = waitingList[message.origin].success;
        orgRequest(result);
    }
    subscribers.filter(({sender, type})=>{
        let match =  (!sender ||sender==message.sender) 
            && (!type || type==message.type)
            return match;
    }).forEach(item=>{
        console.log(`handling ${message.type}`)
        item.handle(message)
    })
}
export {dispatch, publish, subscribe}