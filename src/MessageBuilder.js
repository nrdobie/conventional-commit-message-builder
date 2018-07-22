import React from 'react'
import { withFormik } from 'formik'
import { Form, Segment, Divider, Message } from 'semantic-ui-react'
import * as yup from 'yup'

const TYPE_OPTIONS = [
  {
    key: 'build',
    value: 'build',
    description:
      'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)'
  },
  {
    key: 'ci',
    value: 'ci',
    description:
      'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)'
  },
  { key: 'docs', value: 'docs', description: 'Documentation only changes' },
  { key: 'feat', value: 'feat', description: 'A new feature' },
  { key: 'fix', value: 'fix', description: 'A bug fix' },
  {
    key: 'perf',
    value: 'perf',
    description: 'A code change that improves performance'
  },
  {
    key: 'refactor',
    value: 'refactor',
    description: 'A code change that neither fixes a bug nor adds a feature'
  },
  {
    key: 'style',
    value: 'style',
    description:
      'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'
  },
  {
    key: 'test',
    value: 'test',
    description: 'Adding missing tests or correcting existing tests'
  }
]

export const MessageBuilder = ({
  values,
  dirty,
  errors,
  setFieldValue,
  handleBlur,
  isValid
}) => {
  const suHandleChange = (e, { name, id, value }) =>
    setFieldValue(name || id, value)

  return (
    <React.Fragment>
      <Form onSubmit={e => e.preventDefault()}>
        <div className="ui required field">
          <label>What type of change did you make in this PR?</label>
          {TYPE_OPTIONS.map(option => (
            <Form.Radio
              id={option.key}
              key={option.key}
              value={option.value}
              label={
                <label>
                  <strong>{option.value}:</strong> {option.description}
                </label>
              }
              name="type"
              checked={values.type === option.value}
              onChange={suHandleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <Form.Input
          id="ticket"
          label="What is the ticket for this PR?"
          value={values.ticket}
          onChange={suHandleChange}
          onBlur={handleBlur}
        />
        <Form.Input
          id="scope"
          label="What scope of the project did you change?"
          value={values.scope}
          onChange={suHandleChange}
          onBlur={handleBlur}
        />
        <Form.Input
          id="title"
          label="Give a short description of what you did?"
          required
          value={values.title}
          onChange={suHandleChange}
          onBlur={handleBlur}
        />
        <Form.TextArea
          id="description"
          label="Describe in more detail what you did during this PR?"
          required
          rows={5}
          value={values.description}
          onChange={suHandleChange}
          onBlur={handleBlur}
        />
        <Form.TextArea
          id="breaking"
          label="Is there a breaking change in this PR?"
          rows={2}
          onChange={suHandleChange}
          onBlur={handleBlur}
        />
        <p>
          <em>* – required</em>
        </p>
      </Form>
      {dirty && (
        <React.Fragment>
          <Divider />
          <h2>Your Commit Message</h2>
          {!isValid && (
            <Message warning>
              <p>
                <strong>Your message could be better</strong>
              </p>
              <ul>
                {Object.keys(errors).map(e => <li key={e}>{errors[e]}</li>)}
              </ul>
            </Message>
          )}
          <p>
            Take this generated message and use the bold part as your PR title
            and the non-bold as your PR description. When the PR is approved,
            use the squash method and make sure that both the title and
            description are set to the squash message.
          </p>
          <Segment>
            <pre style={{ whiteSpace: 'pre-wrap' }}>
              <code>
                <strong>
                  {values.type}
                  {values.scope && `(${values.scope})`}: {values.title}{' '}
                  {values.ticket && `(${values.ticket.toUpperCase()})`}
                </strong>
                {`\n\n${values.description}`}
                {values.breaking && `\n\nBREAKING CHANGE: ${values.breaking}`}
              </code>
            </pre>
          </Segment>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default withFormik({
  validationSchema: yup.object({
    type: yup
      .string()
      .oneOf(TYPE_OPTIONS.map(o => o.value))
      .required('You need to provide what type of change.'),
    title: yup
      .string()
      .min(10, 'Your short description should be more than 10 characters.')
      .max(50, 'Your short description should be less than 50 characters.')
      .required('You need to provide a short description.'),
    description: yup
      .string()
      .min(50, 'Your details should be more than 50 characters.')
      .max(300, 'Your details should be less than 300 characters.')
      .required('You should provide more details.'),
    breaking: yup
      .string()
      .min(10, 'Your breaking changes should be more than 10 characters.')
      .max(100, 'Your short description should be less than 100 characters.')
  }),
  mapPropsToValues: () => ({
    type: '',
    scope: '',
    ticket: '',
    title: '',
    description: '',
    breaking: ''
  })
})(MessageBuilder)
