import MaterialTable from 'material-table'
import apiClient from "../ApiClient"
import gql from "graphql-tag";

const pubMessage =gql`mutation publish(
    $receiver: String!,
    $type: String!,
    $payload: String!
  ){publish(
    receiver:$receiver,
    type:$type,
    payload:$payload
  ){userId}}`
class FileList extends React.Component {
   
    componentDidMount(){
        if (!this.props.data)
        apiClient.mutate({
            mutation: pubMessage,
            variables:{
                receiver: this.props.token,
                type:'requestFileList',
                payload:'/'
            }
        }).then((data)=>{
            console.log(data)
        })
    }

    render(){
  
       return (<MaterialTable
        columns={[
            { title: 'Name', field: 'name' },
            { title: 'Surname', field: 'surname' },
            { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
            {
            title: 'Birth Place',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            },
        ]}
        data={[
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
        ]}
        title="Selection Example"
        actions={[
            {
            icon: 'done_all',
            tooltip: 'Do',
            onClick: (event, rows) => {
                alert('You selected ' + rows.length + ' rows')
            },
            },
        ]}
        options={{
            selection: true,
            search: false
        }}
        />)
    }
}
export default FileList