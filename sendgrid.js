const sgMail = require('@sendgrid/mail')

// SendGrid config
sgMail.setApiKey(process.env.SG_API_KEY)

exports.handler = async (event, _, callback) => {
  const errorGen = (err) => {
    return callback(null, { statusCode: 500, body: err })
  }

  try {
    // Validate presence of data
    const { data } = JSON.parse(event.body)
    if (!data) {
      return errorGen('No data provided')
    }

    await sgMail.send(data)
    return callback(null, { statusCode: 200, body: 'Message sent!' })
  } catch (err) {
    return errorGen(err.toString())
  }
}
