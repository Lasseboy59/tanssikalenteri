import React from 'react'
import { connect } from 'react-redux'
import { addComment } from '../reducers/videoReducer'
import { useField } from '../hooks'
import PropTypes from 'prop-types'
import { Button, Input } from 'semantic-ui-react'

const Comment = props => {
  if (props.video.comments === undefined) return null

  const comment = useField('comment')

  const handleComment = async () => {
    await props.addComment(props.video.id, comment.value)
    comment.reset()
  }

  const omitReset = (hook) => {
    let { reset, ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  const comments = props.video.comments.map(c => <li key={c.id}>{c.comment}</li>)

  return (
    <div>
      <h3>comments</h3>
      <Input id="commentInput"{...omitReset(comment)} />
      <Button className="ui basic tiny button" id="addComment" onClick={handleComment}>add comment</Button>
      <ul>{comments}</ul>
    </div>
  )
}

Comment.propTypes = {
  video: PropTypes.object.isRequired,
}

const mapDispatchToProps = {
  addComment
}

const ConnectedComment = connect(null, mapDispatchToProps)(Comment)

export default ConnectedComment