import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import BuObjects from '../../data/BuObjects'
import { connect } from "react-redux";

class BoSelect extends React.Component {
    render(){
        let {query,objectName, data, valueChanged, ...rest} = this.props;
        return <BuObjects objectName={objectName} query={query}  >
                <Select
                native
                
                onChange={valueChanged}
               
            >
            {
                data.map((item, idx)=>{
                    
                    return (<option key={item.id} name={item.id} >{item.name}</option>);
                })
            }
                
            </Select></BuObjects>
    }
}


const mapStateToProps = state => {
    return (state) => { 
         if (state.buObjects.queryProjects)
           return {
             //loadState:state.buObjects.queryProjects.state, 
             data:state.buObjects.queryProjects.records
           }
           return {data:[]}
     };
   };
   
export default connect(mapStateToProps,
   null
   )(BoSelect);
