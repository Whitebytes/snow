import apiClient from "../modules/ApiClient"
import gql from "graphql-tag";
import {loadMenu} from '../modules/components/MenuRouter'
import store from '../redux/store';
import { logonStates } from "../redux/states";

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
var queue =[]
var subscribers =[]
var storeUnsubscribe;
const handleQueue = ()=>{
    if(store.getState().logon.logonState==logonStates.ONLINE){
        if (storeUnsubscribe)
            storeUnsubscribe();
        while(queue.length){
            var pb = queue.shift();
            publishImpl(pb.payload, pb.timeout)
                .then( pb.resolve, pb.reject)
        }
    }
    else //listen to storestate changes until connection online
        storeUnsubscribe = store.subscribe(handleQueue);
}

const subscribe = (sender, type, handler) =>{
    subscribers.push({
        sender, 
        type, 
        handle: handler
    })   
}

const publish = (payload, timeout=5000) =>{
    return new Promise(function (resolve, reject){
        queue.push({ payload, timeout, resolve, reject })
        handleQueue()
    })
}
const publishImpl = (payload, timeout=5000) =>{
    var promise = new Promise(function (resolve, reject){
        apiClient.mutate({
            mutation: pubMessage,
            variables:{...payload }
        })
        .then( ({data}) =>{
            var id = data.publish.id;
            if (waitingList[id]){
                //hapens when response is already back
                resolve(waitingList[id])
                delete waitingList[id]
            }else{
                waitingList[id]={
                    success: (result)=> {
                        delete waitingList[id]
                        resolve(result)
                    }
                }
            }
        }, (error) =>{
            console.log(error)
            reject(error)
        })
        //todo: add timeout
    }) 
    return promise;
}
const dispatch = (message) =>{
    if (message.origin){
        if (typeof(waitingList[message.origin])=='undefined'){
            //hapens when response is back before request completely handled
            waitingList[message.origin] = message.payload
        }else{
            var orgRequest = waitingList[message.origin].success;
            orgRequest(message.payload);
        }
    }else{
        loadMenu();
    }

    subscribers.filter(({sender, type})=>{
        return sender==message.sender && type==message.type
    }).forEach(item=>item.handle(message))
}
export {dispatch, publish, subscribe}