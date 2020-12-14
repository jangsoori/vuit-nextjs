import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
const PostWrapper = styled.div`
  border-radius: 0.2rem;
  overflow: hidden;
  /* position: relative; */
  display: flex;
  flex-direction: column;
  /* width: 400px; */
  height: 100%;
`;
const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  a:first-of-type {
    line-height: 0;
    width: 100%;
  }
  a:last-of-type {
  }
  img {
    width: 100%;
  }
`;
const LinkExternalImage = styled.i`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  color: white;
  z-index: 2;
  :hover {
    cursor: pointer;
    color: #ccc;
  }
`;
const Image = styled.img`
  cursor: pointer;
`;
const Meta = styled.section`
  background: #333;
  padding: 1rem;
  font-family: "Dosis";
  letter-spacing: normal;
`;
const Title = styled.p`
  color: white;
  font-size: 1.8rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Details = styled.section`
  font-size: 1.4rem;
  color: white;
  /* opacity: 0.5; */
  color: #888;
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-start;
  column-gap: 1rem;
`;
const Author = styled.a`
  :hover {
    text-decoration: underline;
    opacity: 1;
    color: #f9f9f9;
  }
`;

const Detail = styled.p``;
export default function Post({ post, i }) {
  const [spans, setSpans] = useState("");
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef();
  const metaRef = useRef();
  //Check if Post has Image
  const hasImage = () => {
    if (post.preview) {
      return true;
    } else {
      return false;
    }
  };
  const { author, created_utc, permalink, score } = post;

  //Get time of post creation converted from epoch time
  const time = dayjs.unix(created_utc)["$d"].toString();
  //use relativeTime plugin, necessary to work for .fromNow()
  dayjs.extend(relativeTime);
  //Calculate time since post creation
  const createdAgo = dayjs(time).fromNow();
  useEffect(() => {
    //IF post has image, set grid spans according to image height and meta text height, if not, just take height of meta and render.
    if (hasImage()) {
      //This allows browser to get image height after it is loaded. It displayed as "0" before that, because it tried to get data when the image was not loaded.
      //We need to wait for image to load, then set spans.
      imageRef?.current?.addEventListener("load", () => {
        setSpans(
          Math.ceil(
            (imageRef?.current?.clientHeight + metaRef?.current?.clientHeight) /
              10 +
              1
          )
        );
      });
    } else {
      //We don't need to wait for text to load, so just set spans.
      setSpans(Math.ceil(metaRef?.current?.clientHeight / 10 + 1));
    }
  }, [imageRef, metaRef]);

  //Get image url if post has image
  const url = () =>
    hasImage() && post?.preview
      ? post.preview.images[0]?.resolutions[
          post.preview.images[0]?.resolutions?.length - 1
        ].url
      : post.thumbnail;

  //Fix formatting of url
  const fixUrl = (url) => url.replaceAll("&amp;", "&");
  return (
    <>
      <PostWrapper
        className={i}
        style={
          (loaded && hasImage()) || !hasImage()
            ? { gridRowEnd: `span ${spans}` }
            : { display: "none" }
        }
      >
        {/* If there is image, render it. If not, ignore. */}
        {hasImage() && (
          <ImageWrapper>
            <a
              href={`https://www.reddit.com${permalink}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                onLoad={() => {
                  setLoaded(true);
                }}
                onChange={(e) => {
                  console.log(e);
                }}
                ref={imageRef}
                src={fixUrl(url())}
                alt="dsa"
              />
            </a>
            <a href={post.url} target="_blank" rel="noreferrer">
              <LinkExternalImage className="fas fa-external-link-alt fa-2x"></LinkExternalImage>
            </a>
          </ImageWrapper>
        )}

        <Meta ref={metaRef}>
          <Title>{post?.title}</Title>
          <Details>
            <Detail>created {createdAgo}</Detail>

            <Detail>
              <Author
                href={`https://www.reddit.com/u/${author}`}
                target="_blank"
                rel="noreferrer"
              >
                u/{author}
              </Author>
            </Detail>
            <Detail>{score} upvotes</Detail>
          </Details>
        </Meta>
      </PostWrapper>
    </>
  );
}
