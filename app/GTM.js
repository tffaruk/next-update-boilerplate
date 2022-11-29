"use client";
import config from "@config/config.json";
import { useEffect, useState } from "react";

const GTM = () => {
  const [gtm, setGtm] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      process.env.NODE_ENV === "production" &&
        config.params.tag_manager_id &&
        setGtm(true);
    }, 5000);
  }, []);

  return (
    <>
      {gtm && (
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${config.params.tag_manager_id}" height="0" width="0" style="display: none; visibility: hidden;" />`,
          }}
        />
      )}
    </>
  );
};

export default GTM;
