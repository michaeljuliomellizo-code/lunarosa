"use client";

import { useState } from "react";

export default function MarketingForm() {
  const [subject, setSubject] =
    useState("");

  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function sendCampaign() {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/admin/email-campaign",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              subject,
              content,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error
        );
      }

      alert(
        "Campaña enviada"
      );

      setSubject("");

      setContent("");
    } catch (error: any) {
      alert(
        error.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h1 className="text-3xl font-bold mb-6">
        Email Marketing
      </h1>

      <input
        type="text"
        placeholder="Asunto"
        value={subject}
        onChange={(e) =>
          setSubject(
            e.target.value
          )
        }
        className="
          w-full
          border
          p-3
          rounded-lg
          mb-4
        "
      />

      <textarea
        rows={12}
        placeholder="Contenido HTML"
        value={content}
        onChange={(e) =>
          setContent(
            e.target.value
          )
        }
        className="
          w-full
          border
          p-3
          rounded-lg
          mb-4
        "
      />

      <button
        onClick={
          sendCampaign
        }
        disabled={loading}
        className="
          bg-pink-500
          text-white
          px-6
          py-3
          rounded-lg
        "
      >
        {loading
          ? "Enviando..."
          : "Enviar Campaña"}
      </button>

    </div>
  );
}