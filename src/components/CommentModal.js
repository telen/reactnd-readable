import React, { Component } from 'react'
import Modal from 'react-modal'

export default class CommentModal extends Component {

  handleAuthorChange = (event) => {
    const { handleEditing } = this.props
    handleEditing({ author: event.target.value })
  }
  handleBodyChange = (event) => {
    const { handleEditing } = this.props
    handleEditing({ body: event.target.value })
  }
  handleSubmit(event) {
    const { modalType, current, submitComment } = this.props
    if (modalType === 'create') {
      current.timestamp = Date.now()
      current.id = Math.random().toString(36).slice(2)
      current.parentId = ''
    }

    submitComment(current)
    event.preventDefault()
  }

  render() {
    const { isOpen, modalType, currentComment } = this.props
    const { closeModal } = this.props

    return (<Modal
      className="modal"
      overlayClassName='overlay'
      isOpen={isOpen}
      contentLabel='Modal'>
      <div className="modal-close">
        <button onClick={() => closeModal()}>close</button>
      </div>
      <div>{modalType} Comment</div>
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Author:
            <input type="text" onChange={this.handleAuthorChange} required value={currentComment.author} disabled={modalType === 'update'} />
          </label>
        </div>
        <div>
          <label>
            Content:
            <textarea onChange={this.handleBodyChange} required value={currentComment.body} />
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
      </Modal>
    )
  }
}
