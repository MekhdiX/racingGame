import { Forum as ForumAPI } from 'api/forum';
import { t } from 'common/dictionary';
import { useAuth } from 'common/hooks/authHook';
import { useStringField } from 'common/hooks/formHooks';
import { FieldChangeEvent } from 'common/types';
import Layout from 'components/Layout';
import some from 'lodash/some';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Button, Comment, Form, Header, Label } from 'semantic-ui-react';
import { getForumTopic } from 'store/actions/forumTopic';
import { getForumTopicsSelector, getUserSelector } from 'store/selectors';

import { ForumErrors } from './types';

const ForumList: FC = () => {
  useAuth();

  const history = useHistory();
  const dispatch = useDispatch();
  const topics = useSelector(getForumTopicsSelector);
  const { id } = useParams<{ id: string }>();
  const [isSend, setIsSend] = useState(false);
  const [errors, setErrors] = useState<Partial<ForumErrors>>({});
  const [comment, handleChangeComment, setComment] = useStringField('');

  const [errorsReply, setErrorsReply] = useState<Partial<ForumErrors>>({});
  const [commentReply, handleChangeCommentReply, setCommentReply] = useStringField('');

  const user = useSelector(getUserSelector);

  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);

  const handleBlurComment = (event: FieldChangeEvent): void => {
    const { name, value } = event.target;

    setErrors((prevState) => ({
      ...prevState,
      [name]: !value,
    }));
  };

  const handleBlurCommentReply = (event: FieldChangeEvent): void => {
    const { name, value } = event.target;

    setErrorsReply((prevState) => ({
      ...prevState,
      [name]: !value,
    }));
  };

  useEffect(() => {
    dispatch(getForumTopic());
  }, [isSend, replyCommentId]);

  const handleSubmit = (): void => {
    if (!!comment && !some(errors, Boolean)) {
      ForumAPI.createComment({ topic_id: id, comment, user: user.login }).then(() => {
        setReplyCommentId(null);
        setComment('');
        setIsSend(true);
      });
    }
  };

  const handleSubmitReply = (commentId: number): void => {
    if (!!commentReply && !some(errorsReply, Boolean)) {
      ForumAPI.createComment({ topic_id: id, comment: commentReply, commentId, user: user.login }).then(() => {
        setReplyCommentId(null);
        setCommentReply('');
      });
    }
  };

  // eslint-disable-next-line no-shadow
  const topic = topics.filter((topic) => topic.id.toString() === id)[0];

  if (typeof topic === 'undefined') {
    return (
      <Layout title={t('question')}>
        <div>Topic not found!</div>
      </Layout>
    );
  }

  const topicCommentsOnlyParents = topic.comments
    .filter((item) => item.commentId === null)
    .sort((a, b) => {
      return a.id - b.id;
    })
    .reverse();

  if (!topics.length) {
    return (
      <Layout title={t('question')}>
        <div>Loading...</div>
      </Layout>
    );
  }

  // eslint-disable-next-line no-shadow
  const showReplyForm = (id: number) => {
    setReplyCommentId(id);
  };

  const findReplies = (itemId: number) => {
    return topic.comments
      .filter((item) => item.commentId === itemId)
      .sort((a, b) => {
        return a.id - b.id;
      });
  };

  const renderCommentRecursive = (item, spaceLeft = 0) => {
    return (
      <>
        <Comment key={item.id} style={{ marginLeft: spaceLeft }}>
          <Comment.Content>
            <Comment.Author as="a">{item.user}</Comment.Author>
            <Comment.Text>{item.comment}</Comment.Text>
            <Comment.Actions>
              <Comment.Action onClick={() => showReplyForm(item.id)}>Reply</Comment.Action>
              {replyCommentId === item.id && (
                <Form reply onSubmit={() => handleSubmitReply(item.id)}>
                  <Form.TextArea
                    name="comment"
                    value={commentReply}
                    type="text"
                    onChange={handleChangeCommentReply}
                    style={{ minHeight: 120 }}
                    onBlur={handleBlurCommentReply}
                    error={errorsReply.comment}
                  />
                  <Form.Input type="hidden" value={item.id} name="commentId" />
                  <Button type="submit" content="Add Reply" labelPosition="left" icon="edit" primary />
                </Form>
              )}
            </Comment.Actions>
          </Comment.Content>
        </Comment>
        {/* eslint-disable-next-line no-shadow */}
        {findReplies(item.id).map((item) => renderCommentRecursive(item, spaceLeft + 20))}
      </>
    );
  };

  return (
    <Layout title={t('question')}>
      <Button onClick={() => history.goBack()} secondary>
        {t('back')}
      </Button>
      <h3>{topic.title}</h3>
      <p>{topic.description}</p>
      <Label>by {topic.user}</Label>
      <hr />

      <div style={{ marginTop: '26px' }}>
        <h3>Comments:</h3>
      </div>
      {!isSend ? (
        <Form onSubmit={handleSubmit}>
          <Form.TextArea
            name="comment"
            value={comment}
            type="text"
            onChange={handleChangeComment}
            style={{ minHeight: 120 }}
            onBlur={handleBlurComment}
            error={errors.comment}
          />
          <Button content="Add Reply" type="submit" labelPosition="left" icon="edit" primary />
        </Form>
      ) : (
        <Header as="h1" textAlign="center">
          {t('success')}
        </Header>
      )}
      <hr />

      <Comment.Group>{topicCommentsOnlyParents.map((item) => renderCommentRecursive(item))}</Comment.Group>
    </Layout>
  );
};
export default ForumList;
