export default function Subscribe() {
    const handleSubmit = async event => {
      event.preventDefault()
      const target = event.target
  
      const data = {
        subscriberName: target.name,
        subscriberEmail: target.email
      }
      //call to the Netlify Function you created
      fetch("./.netlify/functions/triggerSubscribeEmail", {
        method: "POST",
        body: JSON.stringify({
          subscriberName: data.subscriberName,
          subscriberEmail: data.subscriberEmail,
          inviteeEmail: "info@netlify.com"
        })
      })
    }
    return (
      <div className="subscribe-form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    )
  }
  