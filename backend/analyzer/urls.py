from django.urls import path
from .views import AnalyzeContentView, OCRScanView, ThreatReportListCreateView, SimulationListView, StatsView

urlpatterns = [
    path('analyze/', AnalyzeContentView.as_view(), name='analyze-content'),
    path('ocr-scan/', OCRScanView.as_view(), name='ocr-scan'),
    path('scams/', ThreatReportListCreateView.as_view(), name='scam-reports'),
    path('simulations/', SimulationListView.as_view(), name='simulations'),
    path('stats/', StatsView.as_view(), name='stats'),
]
