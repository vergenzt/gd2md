# gd2md

Web service to convert Google Docs to Markdown format.

## Usage

 1. Set **Link Sharing** for your doc to "**On** - Anyone with the link".
 2. Copy the **document ID** from the URL.
 
 E.g. if your URL looks like: 
     `https://docs.google.com/document/d/12oTrqMngf4YQQ5Lcq4vbsBhTt78z7VAv6OixgKJYeRw/edit` 
 then your document's ID is **12oTrqMngf4YQQ5Lcq4vbsBhTt78z7VAv6OixgKJYeRw**.
 
 This value can also have dashes in it sometimes.
 
 3. Visit http://gd2md.herokuapp.com/YOUR-DOCUMENT-ID.md to view your document in Markdown.
