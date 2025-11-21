import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import ProductZoom from "../components/Productzoom/ProductZoom";
import ProductDetailsComponent from "../components/ProductDetailsComponent";
import ProductTabs from "../components/ProductTabs";
import { fetchTemplateById } from "../api/templateAPI";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchTemplateById(id);
        setProduct(data);
      } catch (err) {
        console.error("❌ Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-gray-50">
        <CircularProgress />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        Product not found
      </div>
    );
  }

  const images = product.images?.map((img) => img.url) || [];
  const mainImage = images[0];
  const categoryName = product.categories?.[0]?.name || "Uncategorized";

  return (
    <div className="bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-8xl mx-auto">
        {/* ---------- Breadcrumb ---------- */}
        <Breadcrumbs className="mb-5 text-sm text-gray-600">
          <Link component={RouterLink} underline="hover" color="inherit" to="/">
            Home
          </Link>
          <Link
            component={RouterLink}
            underline="hover"
            color="inherit"
            to={`/collections/${categoryName}`}
          >
            {categoryName}
          </Link>
          <Typography color="text.primary" className="truncate max-w-[480px]">
            {product.title}
          </Typography>
        </Breadcrumbs>

        {/* ---------- Main Product Section ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm p-5 sm:p-8">
          {/* LEFT: Product Images */}
          <div className="flex flex-col justify-start items-center">
            <ProductZoom images={images.length ? images : [mainImage]} />
          </div>

          {/* RIGHT: Product Details */}
          <div className="flex flex-col justify-start">
            <ProductDetailsComponent
              product={{
                _id: product._id,
                title: product.title,
                description: product.description,
                price: product.offerPrice,
                salePrice: product.salePrice,
                discount: product.discount,
                editableLevel: product.editable_level,
                styleTags: product.style_tags,
                colorTags: product.color_tags,
                productType: product.productType,
                language: product.language,
                images: product.images, // ✅ Add this
                mainImageUrl: product.mainImageUrl, // ✅ Add this
              }}
            />
          </div>
        </div>

        {/* ---------- Product Tabs ---------- */}
        <div className="mt-10">
          <ProductTabs
            description={product.description}
            styleTags={product.style_tags}
            colorTags={product.color_tags}
            productType={product.productType}
            language={product.language}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
