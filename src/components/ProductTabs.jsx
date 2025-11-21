import React, { useState } from "react";
import { Rating, Button, TextField } from "@mui/material";

const ProductTabs = ({ description, styleTags, colorTags, productType, language }) => {
  const [tab, setTab] = useState("description");

  return (
    <div className="mt-10 bg-white rounded-xl shadow-sm p-6">
      {/* ---------- Tabs Header ---------- */}
      <div className="flex flex-wrap gap-6 border-b pb-2 text-gray-700 font-medium text-sm">
        {["description", "details", "reviews"].map((t) => (
          <span
            key={t}
            className={`cursor-pointer capitalize transition-all ${
              tab === t
                ? "text-pink-600 border-b-2 border-pink-600 pb-1"
                : "hover:text-pink-600"
            }`}
            onClick={() => setTab(t)}
          >
            {t}
          </span>
        ))}
      </div>

      {/* ---------- Description Tab ---------- */}
      {tab === "description" && (
        <div className="mt-6 text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none">
          {description ? (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          ) : (
            <>
              <p>
                Our invitations are designed to make your special moments memorable.
                Customize text, add photos, and share digitally in seconds.
              </p>
              <p>
                All designs are editable and optimized for high-resolution digital
                sharing across WhatsApp, Instagram, and email.
              </p>
            </>
          )}
        </div>
      )}

      {/* ---------- Details Tab ---------- */}
      {tab === "details" && (
        <div className="mt-6 text-sm text-gray-700">
          <table className="w-full border rounded-md overflow-hidden">
            <tbody>
              {productType?.length > 0 && (
                <tr className="border-b">
                  <td className="p-3 font-medium w-1/3">Type</td>
                  <td className="p-3">{productType.join(", ")}</td>
                </tr>
              )}
              {language?.length > 0 && (
                <tr className="border-b">
                  <td className="p-3 font-medium">Languages</td>
                  <td className="p-3">{language.join(", ")}</td>
                </tr>
              )}
              {styleTags?.length > 0 && (
                <tr className="border-b">
                  <td className="p-3 font-medium">Style Tags</td>
                  <td className="p-3">{styleTags.join(", ")}</td>
                </tr>
              )}
              {colorTags?.length > 0 && (
                <tr>
                  <td className="p-3 font-medium">Color Tags</td>
                  <td className="p-3">{colorTags.join(", ")}</td>
                </tr>
              )}
              {!productType?.length && !language?.length && !styleTags?.length && !colorTags?.length && (
                <tr>
                  <td colSpan="2" className="p-3 text-gray-500 text-center">
                    No detailed specifications available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------- Reviews Tab ---------- */}
      {tab === "reviews" && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Customer Reviews</h3>
          <div className="space-y-3 mb-6">
            {[1, 2].map((i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-800">Sumit Maurya</h4>
                  <Rating size="small" value={5} readOnly />
                </div>
                <p className="text-sm mt-2 text-gray-600">
                  Very beautiful design! Highly recommended for wedding invites.
                </p>
              </div>
            ))}
          </div>

          <h4 className="font-medium mb-2">Write a Review</h4>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Write your review here..."
            variant="outlined"
            className="mb-3"
          />
          <Button className="!bg-pink-600 hover:!bg-pink-700 !text-white">
            Submit Review
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductTabs;
