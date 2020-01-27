import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import { useField } from '../hooks'
import { createVideo } from '../reducers/videoReducer'
import { Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

const VideoForm = props => {

  const title = useField('title')
  const url = useField('url')

  const handleVideoCreation = async (event) => {
    event.preventDefault()
    const videoObject = {
      title: title.value,
      author: props.user.name,
      url: url.value
    }

    try {
      await props.createVideo(videoObject)
      title.reset()
      url.reset()
      props.notify(`a new dancevideo '${videoObject.title}' successfully added`)
    } catch (exception) {
      props.notify(`${exception.response.data.error}`, true)
    }
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  return (
    <div>
      <br></br>
      <Togglable buttonLabel='add'>
        <div>
          <Form onSubmit={event => handleVideoCreation(event)}>
            <Form.Field>
              <label>title</label>
              <input id="title" data-cy="title" {...omitReset(title)} />
            </Form.Field>
            <Form.Field>
              <label>url</label>
              <input id="url" data-cy="url" {...omitReset(url)} />
            </Form.Field>
            <Button className="ui basic tiny button" type='submit' data-cy="Add">Add</Button>
          </Form>
        </div>
      </Togglable>
    </div>

  )
}

VideoForm.propTypes = {
  notify: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    user: state.user,
    video: state.video,
    users: state.users
  }
}

const mapDispatchToProps = {
  createVideo
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoForm)