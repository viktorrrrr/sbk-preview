export default async function preview(req, res) {
    const { slug = '' } = req.query
    // get the storyblok params for the bridge to work
    const params = req.url.split('?')

    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (req.query.secret !== 'MY_SECRET_TOKEN') {
      return res.status(401).json({ message: 'Invalid token!' })
    }
    
  
    // Enable Preview Mode by setting the cookies
    res.setPreviewData({})
 
    // Set cookie to None, so it can be read in the Storyblok iframe
    
    res.setPreviewData({})
    const previous = res.getHeader('Set-Cookie')
    previous.forEach((cookie, index) => {
      previous[index] = cookie.replace('SameSite=Lax', 'SameSite=None;Secure')
    })
    res.setHeader(`Set-Cookie`, previous)
    res.end("Preview mode enabled")
  
    // Redirect to the path from entry
    res.redirect(`/${slug}?${params[1]}`)
  }
