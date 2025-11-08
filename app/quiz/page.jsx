"use client";

import React, { useMemo, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard";
import quizConfig from "./product_point.json";
import { ArrowRight, ChevronLeft, Loader2, RotateCcw } from "lucide-react";

const QuizPage = () => {
  const { products = [], isLoading } = useAppContext();

  const questions = quizConfig.questions ?? [];
  const totalQuestions = questions.length;

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(() => questions.map(() => null));
  const [result, setResult] = useState(null);
  const [showValidation, setShowValidation] = useState(false);

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === totalQuestions - 1;
  const progress = result
    ? 100
    : totalQuestions
    ? Math.round(((currentStep + 1) / totalQuestions) * 100)
    : 0;

  const handleSelectOption = (option) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentStep] = option;
      return updated;
    });
    setShowValidation(false);
  };

  const getRecommendationFromScore = (score) => {
    const recommendations = quizConfig.recommendations ?? [];
    if (!recommendations.length) return null;

    const matched =
      recommendations.find((item) => {
        const overMin = score >= (item.minScore ?? 0);
        const underMax =
          typeof item.maxScore === "number" ? score <= item.maxScore : true;
        return overMin && underMax;
      }) ?? recommendations[recommendations.length - 1];

    return matched;
  };

  const handleNext = () => {
    if (!answers[currentStep]) {
      setShowValidation(true);
      return;
    }

    if (isLastStep) {
      const totalScore = answers.reduce(
        (acc, option) => acc + (option?.points ?? 0),
        0
      );
      const recommendation = getRecommendationFromScore(totalScore);
      setResult({
        totalScore,
        recommendation,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep === 0) return;
    setShowValidation(false);
    setCurrentStep((prev) => prev - 1);
  };

  const handleRestart = () => {
    setAnswers(questions.map(() => null));
    setResult(null);
    setCurrentStep(0);
    setShowValidation(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const recommendedProducts = useMemo(() => {
    if (!result?.recommendation) return [];
    const keywords = (result.recommendation.matchCategories ?? []).map((key) =>
      key.toLowerCase()
    );

    if (!keywords.length) {
      return products.slice(0, 4);
    }

    const filtered = products.filter((product) => {
      const categoryName = (product.category ?? "").toLowerCase();
      return keywords.some(
        (keyword) =>
          categoryName === keyword ||
          categoryName.includes(keyword) ||
          keyword.includes(categoryName)
      );
    });

    if (filtered.length === 0) {
      return products.slice(0, 4);
    }

    return filtered.slice(0, 4);
  }, [products, result]);

  const renderQuestion = () => {
    if (!currentQuestion) {
      return (
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-center text-lg font-semibold text-slate-700">
            The quiz is not configured yet. Please try again later.
          </p>
        </div>
      );
    }

    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm space-y-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>
              Question {currentStep + 1}/{totalQuestions}
            </span>
            <span>{progress}% completed</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-slate-900 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-slate-900">
            {currentQuestion.title}
          </h2>
          {currentQuestion.description && (
            <p className="text-sm text-slate-500">
              {currentQuestion.description}
            </p>
          )}
        </div>

        <div className="grid gap-4">
          {currentQuestion.options.map((option) => {
            const isActive = answers[currentStep]?.id === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectOption(option)}
                className={`w-full rounded-xl border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-slate-900/40 ${
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                    : "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50"
                }`}
              >
                <p
                  className={`text-base font-semibold ${
                    isActive ? "text-white" : "text-slate-900"
                  }`}
                >
                  {option.label}
                </p>
                {option.helperText && (
                  <p
                    className={`mt-1 text-sm ${
                      isActive ? "text-slate-100" : "text-slate-500"
                    }`}
                  >
                    {option.helperText}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {showValidation && (
          <p className="text-sm font-medium text-red-500">
            Please select an answer before continuing.
          </p>
        )}

        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-300"
          >
            <ChevronLeft size={16} />
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            {isLastStep ? "View recommended products" : "Next"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    if (!result) return null;

    const { totalScore, recommendation } = result;

    return (
      <div className="space-y-8">
        <div className="rounded-2xl bg-white py-8 shadow-sm">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-4">
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Your compatibility score
              </p>
              <div className="flex items-end gap-4">
                <span className="text-5xl font-bold text-slate-900">
                  {totalScore}
                </span>
                <span className="pb-2 text-sm text-slate-500">
                  (the higher the score, the more powerful the device requires)
                </span>
              </div>
              {recommendation ? (
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {recommendation.title}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {recommendation.description}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  We don't have any recommended products. You can try the quiz
                  again to get a more accurate result.
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400"
                >
                  <RotateCcw size={16} />
                  Restart quiz
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-slate-900">
              Your answers
            </h3>
            <p className="text-sm text-slate-500">
              Below is a summary of your choices for each question.
            </p>
          </div>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const answer = answers[index];
              return (
                <div
                  key={question.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="text-sm font-medium text-slate-500">
                    Question {index + 1}
                  </p>
                  <p className="text-base font-semibold text-slate-900">
                    {question.title}
                  </p>
                  {answer ? (
                    <>
                      <p className="mt-2 text-sm font-medium text-slate-800">
                        {answer.label}
                      </p>
                      {answer.helperText && (
                        <p className="text-sm text-slate-500">
                          {answer.helperText}
                        </p>
                      )}
                      <p className="mt-2 text-xs font-medium text-slate-400">
                        +{answer.points} points
                      </p>
                    </>
                  ) : (
                    <p className="mt-2 text-sm text-slate-500">
                      You haven't selected an answer for this question.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-slate-900">
              Recommended products for you
            </h3>
            <p className="text-sm text-slate-500">
              Based on the score, here are some of the products you might like.
              You can click on each product to see more details.
            </p>
          </div>
          {isLoading && !products.length ? (
            <div className="flex items-center justify-center py-8 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="ml-2 text-sm">Loading products...</span>
            </div>
          ) : recommendedProducts.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {recommendedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              We don't have any recommended products. You can try the quiz again
              to get a more accurate result.
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          TechSpace Quiz
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Find the perfect technology product for you
        </h1>
        <p className="max-w-2xl text-sm text-slate-500">
          Answer quickly 5 questions to help TechSpace understand your needs and
          suggest the best products within your budget and desired experience.
        </p>
      </div>

      {result ? renderResult() : renderQuestion()}
    </div>
  );
};

export default QuizPage;
