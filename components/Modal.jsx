"use client";

import { useSWRConfig } from "swr";
import { useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import Swal from "sweetalert2";
import styles from "@/styles/modal.module.scss";

import Cancel from "./Icons/Cancel";
import useUpdatePicture from "@/hooks/useUpdatePicture";

export default function Modal({ userId, file, setFile, setShowModal }) {
  const updatePicture = useUpdatePicture();
  const editor = useRef(null);
  const { mutate } = useSWRConfig();

  return (
    <>
      <div className={styles.cover} />
      <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.cancel}
          onClick={() => {
            setShowModal(false);
            setFile(null);
          }}
        >
          <Cancel />
        </button>
        <div className={styles.title}>編輯頭像</div>
        <AvatarEditor
          ref={editor}
          image={file}
          width={220}
          height={220}
          border={[50, 0]}
          borderRadius={9999}
          color={[0, 0, 0, 0.5]}
        />
        <button
          type="button"
          className={styles.upload}
          onClick={() => {
            if (!editor?.current) {
              return;
            }

            const canvas = editor.current.getImage();
            canvas.toBlob(async (blob) => {
              if (!blob) {
                return;
              }

              const res = await updatePicture(blob);

              if (res.status === 413) {
                Swal.fire({
                  title: "Error",
                  text: "檔案大小太大",
                  icon: "error",
                  confirmButtonText: "OK",
                });
                setShowModal(false);
                setFile(null);
                return;
              }

              const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
              mutate(`${apiDomain}/users/${userId}`);
              setShowModal(false);
              setFile(null);
            });
          }}
        >
          上傳
        </button>
      </div>
    </>
  );
}
