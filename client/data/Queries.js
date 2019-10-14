import gql from "graphql-tag";
//**********core  */
export const menuQuery=gql`{currModule @client, currMenu @client, drawerOpen @client}`
export const currUser=gql('query{currUser{firstName, lastName, avatar}}')
export const moduleList = gql`query {modules{id,name,icon,menuItems{name, icon, url}}}`
export const subscribe = gql`subscription($topic: String, $sender: String)
    {actionRequest(topic:$topic, sender:$sender ){topic, payload, sender,id}}`

export const publish =gql`mutation publish(
    $topic: String!,
    $receiver: String!,
    $payload: String
  ){publish(
    topic:$topic,
    payload:$payload,
    receiver:$receiver
  ){topic, payload, sender,id}}`

//************************************ ME ************************************************
export const clientInfo = gql('query{clientInfo{hostname,ip, userAgent }}')
export const loginMutation =gql`mutation login(
  $email: String!,
  $password: String!,
  $appName: String!,
  $appProps: String!,
){login(
  email:$email,
  password:$password,
  appName:$appName,
  appProps:$appProps
) }`

//************************************ MEDIA ************************************************
export const mediaRaw = gql`query{queryMediaRaw(clause: "{}") {
  id
  name
  blobRef
  props,
  createdAt,
  labels,
  userOwner {
    firstName
    avatar
  }
}
}`

//************************************ PROJECTS ************************************************
export const projects = gql`query{queryProjects(clause:"{}"){id,name,description,createdAt,
  mapProps, img, userOwner{firstName, avatar}}}`
