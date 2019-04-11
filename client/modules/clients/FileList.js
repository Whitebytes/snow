import MaterialTable from 'material-table'
import {publish, subscribe} from '../../data/MessageBus'
import FileMenu  from './FileMenu'
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'moment-timezone';
import CloudDone from '@material-ui/icons/CloudDone';
import CloudQueue from '@material-ui/icons/CloudQueue';

class FileList extends React.Component {
    
    constructor(props){
        super(props)
        this.state={
            data:[],
            menuOpen:false
        }
    }
    readableFileSize(size) {
        if(size <= 0) return "0";
        let units = [ "B", "kB", "MB", "GB", "TB" ];
        let digitGroups = parseInt(Math.log10(size)/Math.log10(1024));
        let s = parseInt((size/Math.pow(1024, digitGroups))*100)/100.0
        return  s + " " + units[digitGroups];
    }
    formatDate(date){
        let format = "D-M-YYYY"
        if (new Date().Date-date>0)
            format = "hh:mm"
        return moment(date).locale('nl').format(format)
    }
    //because material-table doest accept tree structures like it should
    flattenTable(table, parent){
        var res =[]
        let id=parent ? parent.id+1 : 1
        table.forEach(({files, ...item}) =>{
            item.parent = parent
            item.id=id++
            res.push(item)
            if (files){
                res=res.concat(this.flattenTable(files, item))
                id+=files.length;
            }
        })
        return res
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.token!= prevProps.token){
            this.load()
        }
    }
    componentDidMount(){this.load()}
    load(){
        this.setState({'data':[]})
        publish({
            receiver: this.props.token,
            type:'requestFileList',
            payload:'/'
        }).then(result =>{
           
        })
        subscribe(this.props.token, 'fileList', message => {
            console.log('updateing complete list');
            var dat = this.flattenTable(JSON.parse(message.payload) )
            var data=dat.map(({created, modified, size, ...rest})=>{
                modified = new Date(created)> new Date(modified) ? created: modified;
                return {
                    created: this.formatDate(created),
                    modified: this.formatDate(modified),
                    hrSize: this.readableFileSize(size),
                    size,
                    ...rest
                }
            })
            this.setState({'data': data})
        })
    }
    getFileList(rows){
        const fileName = (row)=>{
            if (row.parent) return fileName(row.parent)+'/'+row.name;
            return row.name
        }
        return rows
            .map(row=> ({
                isDirectory:row.isDirectory, 
                name: fileName(row) }))
            .filter(row=>{return !row.isDirectory && !row.progress })
    }
    menuItemClick(name){
        if (name=='upload'){
            publish({
                receiver: this.props.token,
                type:'requestFileUpload',
                payload: JSON.stringify({
                    projectId: 'to: build form',
                    files: this.getFileList(this.state.selectedRows)
                })
            })
            subscribe(this.props.token, 'uploadProgress',
                (message) => {
                var payload = JSON.parse(message.payload);
                var data = this.state.data;
                var row = data.find((row)=>{return row.mediaRawId == payload.mediaRawId})
                
                if (row){
                    row.progress=payload.progress
                    row.size =payload.size
                    this.setState({'data':data});
                }
            })
          
        }
    }
    toggleMenu(open){
       if (typeof(open)==='undefined')
            open = !this.state.menuOpen;
        this.setState({menuOpen:open})
    }
    render(){
        return (<div><MaterialTable
            columns={[
                { title: 'Name', field: 'name' },
                { title: 'Created', field: 'created' },
                { title: 'Modified', field: 'modified', type: 'numeric' },
                { title: 'Size', field: 'hrSize', type: 'string' },
                { title: 'Cloud', field: 'progress', type:'numeric', render:({progress, size})=>{
     
                    if (typeof(progress)=='undefined')
                        return;
                        
                    if (progress==size)
                        return <CloudDone></CloudDone>
                       
                    if (progress==0)
                        return <CloudQueue></CloudQueue>
                    var perc = (progress*100.0)/size
              
                    return <CircularProgress size={22} variant="static" value={perc} />
                }}
            ]}

            data={this.state.data}
            title="Files"
            actions={[
                {
                icon: 'done_all',
                onClick: (event, rows) => {
                    const { currentTarget } = event;
                    this.setState({
                        anchorEl: currentTarget,
                        selectedRows: rows
                    })
                    this.toggleMenu()
                },
                },
            ]}
            parentChildData={(row, rows) => {
                return rows.find(pRow => {return row.parent && pRow.id===row.parent.id})
            }}
            options={{
                selection: true,
                search: false
            }}
            /><FileMenu menuItemClick={(name)=>this.menuItemClick(name)} toggleMenu={()=>this.toggleMenu()} { ...this.state} ></FileMenu></div>
           
            )
        
        }
}

export default FileList
