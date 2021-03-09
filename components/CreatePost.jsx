import React, {
  Fragment, useState, useRef, useEffect,
} from 'react';
import { TimelineMax, Power3 } from 'gsap';
import TextareaAutosize from 'react-textarea-autosize';
import Dropzone from 'react-dropzone';
import { Editor } from '@tinymce/tinymce-react';
import FeatherIcon from 'feather-icons-react';
import { useStoreState } from 'easy-peasy';
import styles from './CreatePost.module.sass';
import Post from './Post';

const createPost = () => {
  const [currentTab, setCurrentTab] = useState('update');
  const [postBody, setPostBody] = useState('');
  const [articleBody, setArticleBody] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [publishedPosts, setPublishedPosts] = useState([]);
  const profile = useStoreState((state) => state.user.profile);

  let tabContentUpdateRef = useRef(null);
  let tabContentUploadRef = useRef(null);
  let imageUploadRef = useRef(null);
  let tabContentArticleRef = useRef(null);
  let footerActionsRef = useRef(null);

  let [tlShowTabUpdate, setTlShowTabUpdate] = useState(null);
  let [tlShowTabUpload, setTlShowTabUpload] = useState(null);
  let [tlShowUploadPreview, setTlShowUploadPreview] = useState(null);
  let [tlShowTabArticle, setTlShowTabArticle] = useState(null);
  let [tlShowFooterActions, setTlShowFooterActions] = useState(null);

  const activateTab = (tab) => {
    // Return if tab is already active
    if (currentTab === tab) { return; }

    setCurrentTab(tab);
  };

  useEffect(() => {
    // Init all TimelineMax necessary
    let tabUpdate = new TimelineMax({ paused: false });
    tabUpdate.from(tabContentUpdateRef, 0.2, {
      opacity: 0,
      display: 'none',
      transform: 'translateY(-30px)',
    });
    setTlShowTabUpdate(tabUpdate);

    let tabUpload = new TimelineMax({ paused: true });
    tabUpload.from(tabContentUploadRef, 0.4, {
      opacity: 0,
      display: 'none',
      height: 0,
      ease: Power3.easeOut,
    });
    setTlShowTabUpload(tabUpload);

    let uploadPreview = new TimelineMax({ paused: true });
    uploadPreview.from(imageUploadRef, 0.4, {
      opacity: 0,
      display: 'none',
      transform: 'scaleY(.5)',
      ease: Power3.easeOut,
    });
    setTlShowUploadPreview(uploadPreview);

    let tabArticle = new TimelineMax({ paused: true });
    tabArticle.from(tabContentArticleRef, 0.4, {
      opacity: 0,
      display: 'none',
      height: 0,
      ease: Power3.easeOut,
    });
    setTlShowTabArticle(tabArticle);

    let footerActions = new TimelineMax({ paused: true });
    footerActions.from(footerActionsRef, 0.4, {
      opacity: 0,
      height: 0,
      ease: Power3.easeOut,
    });
    setTlShowFooterActions(footerActions);
  }, [footerActionsRef]);

  // Handle showing/hiding form pieces based on actived tab
  useEffect(() => {
    switch (currentTab) {
      case 'update':
        tlShowTabUpdate?.play();
        tlShowTabUpload?.reverse();
        tlShowUploadPreview?.reverse();
        tlShowTabArticle?.reverse();
        break;
      case 'upload':
        tlShowTabUpdate?.play();
        if (imageFiles.length === 0) {
          tlShowTabUpload?.play();
        } else {
          tlShowUploadPreview?.play();
        }
        tlShowTabArticle?.reverse();
        break;
      case 'article':
        tlShowTabUpdate?.reverse();
        if (imageFiles.length === 0) {
          tlShowTabUpload?.play();
        } else {
          tlShowUploadPreview?.play();
        }
        tlShowTabArticle?.play();
        break;
      default:
        break;
    }
  }, [currentTab]);

  const handleChangeTextarea = ({ target }) => {
    setPostBody(target.value);
    setArticleBody(`<p>${target.value}</p>`);
  };

  const handleTinyEditorChange = (content) => {
    // Only update retroactive postBody if user is writing an article
    if (currentTab === 'article') {
      const post = content.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ''); // Strip HTML tags from content
      setPostBody(post);
    }

    setArticleBody(content);
  };

  const showFooterActions = () => {
    // Only show footer actions when post length > 5
    if (postBody.length > 5) {
      tlShowFooterActions?.play();
    } else {
      tlShowFooterActions?.reverse();
    }
  };

  useEffect(() => {
    showFooterActions();
  }, [postBody, articleBody]);

  const handleDropFile = (acceptedFiles) => {
    // Return if there isn't any accepted files
    if (acceptedFiles.length === 0) { return; }

    // Generate preview url
    acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }));

    setImageFiles(acceptedFiles);
  };

  useEffect(() => {
    if (imageFiles.length > 0) {
      tlShowTabUpload?.reverse();
      tlShowUploadPreview?.play();
    } else {
      tlShowTabUpload?.play();
      tlShowUploadPreview?.reverse();
    }
  }, [imageFiles]);

  const removeFile = () => {
    setImageFiles([]);
  };

  const publishNow = () => {
    // Simulate post being publish
    const newPost = {
      id: Math.random().toString(36).substr(2, 9), // Random unique key
      User: {
        name: profile.data.name,
        photo: profile.data.photo,
        username: profile.data.username,
        headline: profile.data.headline,
      },
      time: 'just now',
      body: postBody,
      image: imageFiles[0]?.preview || null,
      likes: 0,
      Comments: [],
    };

    setPublishedPosts((prevArray) => [newPost, ...prevArray]);
    setArticleBody('');
    setPostBody('');
    setCurrentTab('update');
    removeFile();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <div className={`px-4 ${styles.header}`}>
          <nav className={styles.headerNav}>
            <ul>
              <li className={currentTab === 'update' ? styles.activeItem : ''}>
                <button type="button" onClick={() => activateTab('update')}>
                  <div className={`color-blue ${styles.icon}`}>
                    <FeatherIcon icon="edit-2" size="18" strokeWidth="1.2" />
                  </div>
                  <span className="d-none d-md-inline">
                    Share an updade
                  </span>
                  <span className="d-inline d-md-none">
                    Updade
                  </span>
                </button>
              </li>
              <li className={currentTab === 'upload' ? styles.activeItem : ''}>
                <button type="button" onClick={() => activateTab('upload')}>
                  <div className={`color-yellow ${styles.icon}`}>
                    <FeatherIcon icon="camera" size="18" strokeWidth="1.2" />
                  </div>
                  <span className="d-none d-md-inline">
                    Upload a photo
                  </span>
                  <span className="d-inline d-md-none">
                    Upload
                  </span>
                </button>
              </li>
              <li className={currentTab === 'article' ? styles.activeItem : ''}>
                <button type="button" onClick={() => activateTab('article')}>
                  <div className={`color-green ${styles.icon}`}>
                    <FeatherIcon icon="book-open" size="18" strokeWidth="1.2" />
                  </div>
                  <span className="d-none d-md-inline">
                    Write an article
                  </span>
                  <span className="d-inline d-md-none">
                    Article
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="px-4">
          <div className="my-4" ref={(ref) => { tabContentUpdateRef = ref; }}>
            <TextareaAutosize
              className={styles.textarea}
              minRows={1}
              maxRows={15}
              placeholder="Write something..."
              onChange={handleChangeTextarea}
              value={postBody}
            />
          </div>
          <div className="my-4" ref={(ref) => { tabContentUploadRef = ref; }}>
            <Dropzone onDrop={handleDropFile} multiple={false} accept="image/jpeg, image/png">
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: styles.dropzone })}>
                  <input {...getInputProps()} />
                  <p>Drop your image here, or click to select a photo</p>
                </div>
              )}
            </Dropzone>
          </div>
          <div className={`my-4 ${styles.imagePreview}`} ref={(ref) => { imageUploadRef = ref; }}>
            <button
              className={styles.removeImage}
              onClick={removeFile}
              aria-expanded="false"
              type="button"
            >
              <FeatherIcon icon="x" size="16" strokeWidth="1.2" />
            </button>
            {imageFiles.map((file) => (
              <img src={file.preview} alt="Upload" className="w-100 rounded" key={file.lastModified} />
            ))}
          </div>
          <div className={`my-4 ${styles.articleContent}`} ref={(ref) => { tabContentArticleRef = ref; }}>
            <Editor
              id="myCoolEditor"
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
              value={articleBody}
              init={{
                height: 400,
                skin_url: `${process.env.BASE_PATH}/tinymce/skins/ui/linkedin`,
                menubar: false,
                plugins: ['advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code wordcount'],
                toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
                resize: false,
              }}
              onEditorChange={handleTinyEditorChange}
            />
          </div>
        </div>
        <div
          className={styles.footerActions}
          ref={(ref) => { footerActionsRef = ref; }}
        >
          <button
            className={styles.button}
            type="button"
            onClick={() => {}}
          >
            Save as draft
          </button>
          <button
            className={styles.button}
            type="submit"
            onClick={publishNow}
          >
            Publish now
          </button>
        </div>
      </div>
      {publishedPosts.length > 0 && (
        <>
          {publishedPosts.map((post) => (
            <div className="mt-4" key={post.id}>
              <Post
                opPhoto={post.User.photo}
                opName={post.User.name}
                opSubtitle={post.User.headline}
                opLink={`/profile/${post.User.username}/details`}
                postTime={post.time}
                postBody={post.body}
                postImage={post.image}
                postVimeo={post.video}
                postLikes={post.likes}
                postComments={post.Comments}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default createPost;
