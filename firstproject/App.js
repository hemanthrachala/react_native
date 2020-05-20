import React from 'react';
import { StyleSheet, Text, View, ScrollView,SafeAreaView, Button, TextInput, SafeAreaView } from 'react-native';
import {CheckBox} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <Text>Yes will do that</Text>
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "red",
//     alignItems: 'center',
  
//   },
// });

// function Task(props) {
//   return <li>{props.name}, {props.dueDate.toLocaleTimeString()}
//   <button onClick={() => { props.deleteTask(props.id) }}>Delete</button></li>
// }

export default class TodoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {list: props.list};

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }
  handleAddTask(task) {
    // need to push the task into the list
    this.state.list.push(task);
    this.setState({list: this.state.list})
    // console.log("add Task");
  }

  handleDeleteTask(taskId) {
    // console.log(taskId);
    let updatedList = this.state.list.filter(t => t.id !== taskId);
    console.log(updatedList);
    this.setState({ list: updatedList });

  }
  handleCheckTask(i) {
    let compList = this.state.list;
    compList[i].checked = !compList[i].checked;
    this.setState({list:compList});
  }
  listt() {
    return this.state.list.map((t,c) => {
      return (
        <ScrollView>
          <CheckBox title = {"TASK:"+t.name + ", DueDate :" + (t.date)}
          checked = {t.checked} onPress = {() => this.handleCheckTask(i)}/>
          <Button title = "DELETE TASK" onPress= {() => this.handleDeleteTask(t.id)} /> 
        </ScrollView>
      )

    })
  }

  render() {
    // const task = {};
    // const task = {};

    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>
            To Do Native App
          </Text>        
          <TaskNameForm onAddTask={this.handleAddTask}/>
        </View>
        <View><Text>All Lists are</Text></View>
        <ScrollView>
          {this.listt()}
        </ScrollView>
      </SafeAreaView>

    );
      
  }

}

export class TaskNameForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {value:'', date: ''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //to add task
  handleSubmit(event) {
    const taskList = this.props.taskList;
    // to create a task object
    const task=({id:Date.now(), name: this.state.TextInputValue, date:this.state.date, cheked:false}); 

    //add the task object to task list
    // tasks.push(task);
    this.props.onAddTask(task);
    // console.log(tasks);
    event.preventDefault();

  }

  // to set a state
  handleChange(event) {
    // to set the state of the component
    this.setState({value: event.target.value});
      
  }

  render() {
    return(
      <View>
      <TextInput style={{ height: 60, borderWidth: 2 }} placeholder={"Add Task"} value={this.state.TextInputValue} onChangeText={this.handleChange}
      />
      <DatePicker
          style={{width: 400}}
          date={this.state.date}
          mode="date"
          placeholder="Select Date"
          format="DD-MM-YYYY"
          minDate="18-05-2020"
          maxDate="18-05-2025"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
      <Button
            title="Add Task"
            onPress={this.handleSubmit}
        />
      </View> 


    );
  } 
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'brown',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const tasks = [
//   {id:0, name: "Welcome task"}, 
//   {id:1,name: "first task"},
//   {id:2,name: "second task"},
//   {id:3,name: "third task"}]


// ReactDOM.render(
//     <TodoList list={[]}/>,
//     document.getElementById('todo')
//   );




