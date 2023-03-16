import {Component} from 'react'

import {v4 as uuidV4} from 'uuid'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    tasksList: [],
    inputTask: '',
    inputTag: tagsList[0].optionId,
    activeTag: 'INITIAL',
  }

  onChangeInputTask = event => {
    this.setState({inputTask: event.target.value})
  }

  onChangeInputTag = event => {
    this.setState({inputTag: event.target.value})
  }

  onAddTask = event => {
    event.preventDefault()
    const {inputTask, inputTag} = this.state
    const newTask = {
      id: uuidV4(),
      task: inputTask,
      tag: inputTag,
    }
    if (inputTask.length !== 0) {
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        inputTask: '',
        inputTag: '',
      }))
    }
  }

  onClickActiveTag = event => {
    console.log(event.target.value)
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  render() {
    const {tasksList, activeTag, inputTag, inputTask} = this.state
    const filteredTasks =
      activeTag === 'INITIAL'
        ? tasksList
        : tasksList.filter(eachTask => eachTask.tag === activeTag)

    return (
      <div className="main-container">
        <div className="app-container">
          <form className="create-task-container" onSubmit={this.onAddTask}>
            <h1 className="create-task-heading">Create a task!</h1>
            <div className="create-input-container">
              <label className="label" htmlFor="TasksInput">
                Task
              </label>
              <input
                className="input-container"
                type="text"
                id="TasksInput"
                placeholder="Enter the task here"
                onChange={this.onChangeInputTask}
                value={inputTask}
              />
            </div>
            <div className="create-input-container">
              <label className="label" htmlFor="Tags">
                Tags
              </label>
              <select
                id="Tags"
                className="input-container"
                onChange={this.onChangeInputTag}
                value={inputTag}
              >
                {tagsList.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button className="add-task-button" type="submit">
              Add Task
            </button>
          </form>
          <div className="created-tasks-container">
            <h1 className="tags-heading">Tags</h1>
            <ul className="tags-container">
              {tagsList.map(eachTag => {
                const activeTagBtn = activeTag === eachTag.optionId
                const activeTagBtnStyling = activeTagBtn
                  ? 'active-tag-btn'
                  : 'tag-button'
                return (
                  <li key={eachTag.optionId}>
                    <button
                      value={eachTag.optionId}
                      className={activeTagBtnStyling}
                      type="button"
                      onClick={this.onClickActiveTag}
                    >
                      {eachTag.displayText}
                    </button>
                  </li>
                )
              })}
            </ul>
            <h1 className="tags-heading">Tasks</h1>
            {tasksList.length === 0 ? (
              <div className="no-task-container">
                <p className="no-tasks">No Tasks Added Yet</p>
              </div>
            ) : (
              <ul className="tags-list">
                {filteredTasks.map(eachTask => (
                  <li key={eachTask.id} className="tag-item">
                    <p className="task-name">{eachTask.task}</p>
                    <p className="tag-name">{eachTask.tag}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default MyTasks
