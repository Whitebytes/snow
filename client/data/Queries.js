import gql from "graphql-tag";
//LOCAL
export const currMenu=gql`{currMenu @client, currModule @client, drawerOpen @client}`

//remote
export const currUser=gql('query{currUser{firstName, lastName, avatar}}')


export const moduleList = gql`query {modules{id,name,icon,menuItems{name, icon, url}}}`

export const subscribe = gql`subscription($topic: String, $sender: String)
    {actionRequest(topic:$topic, sender:$sender ){topic, payload, sender,id}}`

export const publish =gql`mutation publish(
    $topic: String!,
    $payload: String
  ){publish(
    topic:$topic,
    payload:$payload
  ){topic, payload, sender,id}}`