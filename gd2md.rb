require "sinatra"
require "google/apis/drive_v2"
require "open-uri"
require "word-to-markdown"
require "redcarpet"

DOCX_EXPORT_LINK = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

drive = Google::Apis::DriveV2::DriveService.new
drive.key = ENV["GOOGLE_API_KEY"]

markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)

get "/:id.:ext" do |id, ext|
  # get file metadata
  meta = drive.get_file(id)

  # create path
  Dir.mkdir("docs") unless File.exists?("docs")
  path = "docs/#{id}"

  # download
  open(path, "wb") do |docx|
    docx << open(meta.export_links[DOCX_EXPORT_LINK]).read
  end

  # convert
  md = WordToMarkdown.new(path).to_s

  case ext
    when "md"
      md
    when "html"
      markdown.render(md)
  end
end

