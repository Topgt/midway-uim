import React from 'react';
import { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap, AtomicBlockUtils, convertToRaw, Entity, } from 'draft-js';
import Immutable from 'immutable';
import "draft-js/dist/Draft.css";
import styles from './Rich.less'
const blockRenderMap = Immutable.Map({
    'header-two': {
        element: 'h2',
        aliasedElements: ['p'],
    },
    'left': {
        element: 'div',
    },
    'right': {
        element: 'div',
    },
    'center': {
        element: 'div',
    },
});
class MyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            showURLInput: false,
            url: '',
            urlType: '',
        };

        this.focus = () => this.refs.editor.focus();
        this.logState = () => {
            const content = this.state.editorState.getCurrentContent();
            console.log(convertToRaw(content));
        };
        this.onURLChange = (e) => this.setState({ urlValue: e.target.value });

        this.addAudio = this._addAudio.bind(this);
        this.addImage = this._addImage.bind(this);
        this.addVideo = this._addVideo.bind(this);
        this.confirmMedia = this._confirmMedia.bind(this);
        this.pasteMedia = this._pasteImage.bind(this);
        this.onChange = (editorState) => this.setState({ editorState });
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    _confirmMedia(e) {
        e.preventDefault();
        const {editorState, urlValue, urlType} = this.state;
        const entityKey = Entity.create(urlType, 'IMMUTABLE', { src: urlValue })

        this.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(
                editorState,
                entityKey,
                ' '
            ),
            showURLInput: false,
            urlValue: '',
        }, () => {
            setTimeout(() => this.focus(), 0);
        });
    }

    _pasteImage(files) {
        console.log('files',files);
        const {editorState} = this.state;
        let _self = this;
        for (var i = 0; i < files.length; i++) {
            if (files[i].type.indexOf("image") !== -1) {
                // We need to represent the image as a file,
                var blob = files[i];
                let reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                    let base64data = reader.result;
                    const entityKey = Entity.create('image', 'IMMUTABLE', { src: base64data })

                    _self.setState({
                        editorState: AtomicBlockUtils.insertAtomicBlock(
                            editorState,
                            entityKey,
                            ' '
                        ),
                        showURLInput: false,
                        urlValue: '',
                    }, () => {
                        setTimeout(() => _self.focus(), 0);
                    });
                }
            }
        }
    }

    _onURLInputKeyDown(e) {
        if (e.which === 13) {
            this._confirmMedia(e);
        }
    }

    _promptForMedia(type) {
        const {editorState} = this.state;
        this.setState({
            showURLInput: true,
            urlValue: '',
            urlType: type,
        }, () => {
            setTimeout(() => this.refs.url.focus(), 0);
        });
    }

    _addAudio() {
        this._promptForMedia('audio');
    }

    _addImage() {
        this._promptForMedia('image');
    }

    _addVideo() {
        this._promptForMedia('video');
    }

    render() {
        const {editorState} = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = styles['RichEditor-editor'];
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' ' + styles['RichEditor-hidePlaceholder'];
            }
        }

        let urlInput;
        if (this.state.showURLInput) {
            urlInput =
                <div style={styles2.urlInputContainer}>
                    <input
                        onChange={this.onURLChange}
                        ref="url"
                        style={styles2.urlInput}
                        type="text"
                        value={this.state.urlValue}
                        onKeyDown={this.onURLInputKeyDown}
                        />
                    <button onMouseDown={this.confirmMedia}>
                        Confirm
                </button>
                </div>;
        }
        return (
            <div style={styles2.root}>
                <div style={{ marginBottom: 10 }}>
                    Use the buttons to add audio, image, or video.
              </div>
                <div style={{ marginBottom: 10 }}>
                    Here are some local examples that can be entered as a URL:
                <ul>
                        <li>media.mp3</li>
                        <li>media.png</li>
                        <li>media.mp4</li>
                    </ul>
                </div>
                <div style={styles2.buttons}>
                    <button onMouseDown={this.addAudio} style={{ marginRight: 10 }}>
                        Add Audio
                </button>
                    <button onMouseDown={this.addImage} style={{ marginRight: 10 }}>
                        Add Image
                </button>
                    <button onMouseDown={this.addVideo} style={{ marginRight: 10 }}>
                        Add Video
                </button>
                </div>
                {urlInput}
                <div className={styles["RichEditor-root"]}>
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                        />
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={this.toggleInlineStyle}
                        />
                    <div className={className} onClick={this.focus}>
                        <Editor
                            blockStyleFn={getBlockStyle}
                            blockRendererFn={mediaBlockRenderer}
                            blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}
                            customStyleMap={styleMap}
                            editorState={editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            handlePastedText={(value) => (console.log('paste', value))}
                            handlePastedFiles={this.pasteMedia}
                            handleDroppedFiles={this.pasteMedia}
                            onChange={this.onChange}
                            onTab={this.onTab}
                            placeholder="Tell a story..."
                            ref='editor'
                            spellCheck={true}
                            onPaste={(value) => (console.log('paste', value))}
                            />
                    </div>
                </div>
                <input
                    onClick={this.logState}
                    style={styles2.button}
                    type="button"
                    value="Log State"
                    />
            </div>
        );
    }
}

const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return styles['RichEditor-blockquote'];
        case 'left':
            return styles['align-left'];
        case 'center':
            return styles['align-center'];
        case 'right':
            return styles['align-right'];
        default: return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = styles['RichEditor-styleButton'];
        if (this.props.active) {
            className += ' ' + styles['RichEditor-activeButton'];
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'left', style: 'left' },
    { label: 'right', style: 'right' },
    { label: 'center', style: 'center' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className={styles["RichEditor-controls"]}>
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                    />
            )}
        </div>
    );
};

var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className={styles["RichEditor-controls"]}>
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                    />
            )}
        </div>
    );
};


function mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false,
        };
    }

    return null;
}

const Audio = (props) => {
    return <audio controls src={props.src} style={styles2.media} />;
};

const Image = (props) => {
    return <img src={props.src} style={styles2.media} />;
};

const Video = (props) => {
    return <iframe style={styles2.media} src={props.src} frameBorder="0" allowFullScreen></iframe>;
};

const Media = (props) => {
    const entity = Entity.get(props.block.getEntityAt(0));
    const {src} = entity.getData();
    const type = entity.getType();

    let media;
    if (type === 'audio') {
        media = <Audio src={src} />;
    } else if (type === 'image') {
        media = <Image src={src} />;
    } else if (type === 'video') {
        media = <Video src={src} />;
    }

    return media;
};

const styles2 = {
    root: {
        fontFamily: '\'Georgia\', serif',
        padding: 20,
        width: 600,
    },
    buttons: {
        marginBottom: 10,
    },
    urlInputContainer: {
        marginBottom: 10,
    },
    urlInput: {
        fontFamily: '\'Georgia\', serif',
        marginRight: 10,
        padding: 3,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    media: {
        width: '100%',
    },
};


MyEditor.propTypes = {
};

export default MyEditor;