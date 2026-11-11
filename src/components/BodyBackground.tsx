type Props = {
  showCloudItem?: boolean;
  showVideo?: boolean;
  containerClass?: string;
  videoSrc?: string;
};

export function BodyBackground({
  showCloudItem = true,
  showVideo = true,
  containerClass = "",
  videoSrc = "/assets/images/overlay-2.mp4",
}: Props = {}) {
  return (
    <div className={`body-background${containerClass ? " " + containerClass : ""}`}>
      {showCloudItem && (
        <div className="bg-item">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" width={1440} height={900} src="/assets/images/item/cloud-bg.png" alt="background" />
        </div>
      )}
      {showVideo && (
        <div className="bg-video video-dark">
          <video className="video" muted autoPlay loop playsInline>
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="overlay-1" />
        </div>
      )}
    </div>
  );
}
