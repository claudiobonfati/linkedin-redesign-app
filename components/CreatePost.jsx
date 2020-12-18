import React from 'react';
import { TimelineMax, Power3 } from 'gsap';
import TextareaAutosize from 'react-textarea-autosize';
import Dropzone from 'react-dropzone';
import { Editor } from '@tinymce/tinymce-react';
import styles from './CreatePost.module.sass';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: '',
      postBody: '',
      articleBody: '',
      imageFiles: [],
    };

    this.activateTab = this.activateTab.bind(this);
    this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
    this.handleDropFile = this.handleDropFile.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.handleTinyEditorChange = this.handleTinyEditorChange.bind(this);
    this.showFooterActions = this.showFooterActions.bind(this);
  }

  componentDidMount() {
    // Init all TimelineMax necessary
    this.tlShowTabUpdate = new TimelineMax({ paused: true });
    this.tlShowTabUpdate
      .from(this.tabContentUpdateRef, 0.2, {
        opacity: 0,
        display: 'none',
        transform: 'translateY(-30px)',
      });
    this.tlShowTabUpload = new TimelineMax({ paused: true });
    this.tlShowTabUpload
      .from(this.tabContentUploadRef, 0.4, {
        opacity: 0,
        display: 'none',
        height: 0,
        ease: Power3.easeOut,
      });
    this.tlShowUploadPreview = new TimelineMax({ paused: true });
    this.tlShowUploadPreview
      .from(this.imageUploadRef, 0.4, {
        opacity: 0,
        display: 'none',
        transform: 'translateY(+30px)',
        ease: Power3.easeOut,
      });
    this.tlShowTabArticle = new TimelineMax({ paused: true });
    this.tlShowTabArticle
      .from(this.tabContentArticleRef, 0.4, {
        opacity: 0,
        display: 'none',
        height: 0,
        ease: Power3.easeOut,
      });
    this.tlShowFooterActions = new TimelineMax({ paused: true });
    this.tlShowFooterActions
      .from(this.footerActionsRef, 0.4, {
        opacity: 0,
        height: 0,
        ease: Power3.easeOut,
      });

    this.activateTab('update');
  }

  handleChangeTextarea({ target }) {
    this.setState({
      postBody: target.value,
      articleBody: `<p>${target.value}</p>`,
    }, this.showFooterActions());
  }

  handleTinyEditorChange(content) {
    const newState = {
      articleBody: content,
    };

    // Only update retroactive postBody if user is writing an article
    if (this.state.currentTab === 'article') {
      newState.postBody = content.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ''); // Strip HTML tags from content
    }

    this.setState(newState, this.showFooterActions());
  }

  handleDropFile(acceptedFiles) {
    // Return if there isn't any accepted files
    if (acceptedFiles.length === 0) { return; }

    // Generate preview url
    acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }));

    this.setState(() => ({
      imageFiles: acceptedFiles,
    }), () => {
      this.tlShowTabUpload.reverse();
      this.tlShowUploadPreview.play();
    });
  }

  activateTab(tab) {
    // Return if tab is already active
    if (this.state.currentTab === tab) { return; }

    this.setState({
      currentTab: tab,
    }, () => {
      // Handle showing/hiding form pieces based on actived tab
      switch (tab) {
        case 'update':
          this.tlShowTabUpdate.play();
          if (this.state.imageFiles.length === 0) {
            this.tlShowTabUpload.reverse();
          } else {
            this.tlShowUploadPreview.reverse();
          }
          this.tlShowTabArticle.reverse();
          break;
        case 'upload':
          this.tlShowTabUpdate.play();
          if (this.state.imageFiles.length === 0) {
            this.tlShowTabUpload.play();
          } else {
            this.tlShowUploadPreview.play();
          }
          this.tlShowTabArticle.reverse();
          break;
        case 'article':
          this.tlShowTabUpdate.reverse();
          if (this.state.imageFiles.length === 0) {
            this.tlShowTabUpload.play();
          } else {
            this.tlShowUploadPreview.play();
          }
          this.tlShowTabArticle.play();
          break;
        default:
          break;
      }
    });
  }

  removeFile() {
    this.setState(() => ({
      imageFiles: [],
    }), () => {
      this.tlShowUploadPreview.reverse();
      this.tlShowTabUpload.play();
    });
  }

  showFooterActions() {
    // Only show footer actions when post length > 5
    if (this.state.postBody.length > 5) {
      this.tlShowFooterActions.play();
    } else {
      this.tlShowFooterActions.reverse();
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={`px-4 ${styles.header}`}>
          <nav className={styles.headerNav}>
            <ul>
              <li className={this.state.currentTab === 'update' ? styles.activeItem : ''}>
                <button type="button" onClick={() => this.activateTab('update')}>
                  <div className={`color-blue ${styles.icon}`}>
                    <span className="lnr lnr-pencil" />
                  </div>
                  Share an updade
                </button>
              </li>
              <li className={this.state.currentTab === 'upload' ? styles.activeItem : ''}>
                <button type="button" onClick={() => this.activateTab('upload')}>
                  <div className={`color-yellow ${styles.icon}`}>
                    <span className="lnr lnr-camera" />
                  </div>
                  Upload a photo
                </button>
              </li>
              <li className={this.state.currentTab === 'article' ? styles.activeItem : ''}>
                <button type="button" onClick={() => this.activateTab('article')}>
                  <div className={`color-green ${styles.icon}`}>
                    <span className="lnr lnr-bookmark" />
                  </div>
                  Write an article
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="px-4">
          <div className="my-4" ref={(ref) => { this.tabContentUpdateRef = ref; }}>
            <TextareaAutosize
              className={styles.textarea}
              minRows={1}
              maxRows={15}
              placeholder="Write something..."
              onChange={this.handleChangeTextarea}
              value={this.state.postBody}
            />
          </div>
          <div className="my-4" ref={(ref) => { this.tabContentUploadRef = ref; }}>
            <Dropzone onDrop={this.handleDropFile} multiple={false} accept="image/jpeg, image/png">
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: styles.dropzone })}>
                  <input {...getInputProps()} />
                  <p>Drop your image here, or click to select a photo</p>
                </div>
              )}
            </Dropzone>
          </div>
          <div className={`my-4 ${styles.imagePreview}`} ref={(ref) => { this.imageUploadRef = ref; }}>
            <button
              className={styles.removeImage}
              onClick={this.removeFile}
              aria-expanded="false"
              type="button"
            >
              x
            </button>
            {this.state.imageFiles.map((file) => <img src={file.preview} alt="Upload" className="w-100 rounded" />)}
          </div>
          <div className={`my-4 ${styles.articleContent}`} ref={(ref) => { this.tabContentArticleRef = ref; }}>
            <Editor
              id="myCoolEditor"
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
              value={this.state.articleBody}
              init={{
                height: 400,
                skin_url: '/tinymce/skins/ui/linkedin',
                menubar: false,
                plugins: ['advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code wordcount'],
                toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
                resize: false,
              }}
              onEditorChange={this.handleTinyEditorChange}
            />
          </div>
        </div>
        <div
          className={styles.footerActions}
          ref={(ref) => { this.footerActionsRef = ref; }}
        >
          <button
            className={styles.button}
            type="button"
            onClick={this.onClickButton}
          >
            Save as draft
          </button>
          <button
            className={styles.button}
            type="submit"
            onClick={this.onClickButton}
          >
            Publish now
          </button>
        </div>
      </div>
    );
  }
}

export default CreatePost;
