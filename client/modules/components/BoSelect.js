import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';

class BoSelect extends React.Component {
    render(){
        let {query,objectName, data, valueChanged, ...rest} = this.props;
        return <Query objectName={objectName} query={query}  >
                <Select
                native
                
                onChange={valueChanged}
               
            >
            {
                data.map((item, idx)=>{
                    
                    return (<option key={item.id} name={item.id} >{item.name}</option>);
                })
            }
                
            </Select></Query>
    }
}

   
export default BoSelect
