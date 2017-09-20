
import React, { Component } from 'react'
import Modal from 'react-modal'

export default class NewPostModal extends Component {

  handleTitleChange = (event) => {
    const { handleEditing } = this.props
    handleEditing({ title: event.target.value })
  }
  handleAuthorChange = (event) => {
    const { handleEditing } = this.props
    handleEditing({ author: event.target.value })
  }
  handleCategoryChange = (event) => {
    const { handleEditing } = this.props
    handleEditing({ category: event.target.value })
  }
  handleBodyChange = (event) => {
    const { handleEditing } = this.props
    handleEditing({ body: event.target.value })
  }
  handleSubmit = (event) => {

    const { currentPost, createPost } = this.props
    currentPost.timestamp = Date.now()
    currentPost.id = Math.random().toString(36).slice(2)

    createPost(currentPost)
    event.preventDefault()
  }

  render() {
    const { isOpen, closeModal, categories } = this.props

    return (<Modal
      className="modal"
      overlayClassName='overlay'
      isOpen={isOpen}
      contentLabel='Modal'>
      <div className="modal-close">
        <button onClick={() => closeModal()}>close</button>
      </div>
      <div>new Post</div>

      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Title:
            <input type="text" onChange={this.handleTitleChange} required/>
          </label>
        </div>
        <div>
          <label>
            Author:
            <input type="text" onChange={this.handleAuthorChange} required/>
          </label>
        </div>
        <div>
          <label>
            Category:
            <select onChange={this.handleCategoryChange}>
              {categories.map((category) => {
                return (<option key={category.name} value={category.name}>{category.name}</option>)
              })}
            </select>
          </label>
        </div>
        <div>
          <label>
            Content:
            <textarea  onChange={this.handleBodyChange} required/>
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </Modal>)
  }
}
